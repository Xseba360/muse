// This script applies Prisma migrations
// and then starts Muse.
import dotenv from 'dotenv';
dotenv.config();

import {execa, ExecaError} from 'execa';
import {promises as fs} from 'fs';
import {PrismaClient, Prisma} from '../utils/db.js';
import ora from 'ora';
import {startBot} from '../index.js';
import logBanner from '../utils/log-banner.js';
import createDatabaseUrl, {createDatabasePath} from '../utils/create-database-url.js';
import {DATA_DIR} from '../services/config.js';
import {PrismaBetterSqlite3} from '@prisma/adapter-better-sqlite3';

process.env.DATABASE_URL = process.env.DATABASE_URL ?? createDatabaseUrl(DATA_DIR);

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

const client = new PrismaClient({adapter});

const migrateFromSequelizeToPrisma = async () => {
  await execa('prisma', ['migrate', 'resolve', '--applied', '20220101155430_migrate_from_sequelize'], {preferLocal: true});
};

const doesUserHaveExistingDatabase = async () => {
  try {
    await fs.access(createDatabasePath(DATA_DIR));

    return true;
  } catch {
    return false;
  }
};

const hasDatabaseBeenMigratedToPrisma = async () => {
  try {
    await client.$queryRaw`SELECT COUNT(id) FROM _prisma_migrations`;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2010') {
      // Table doesn't exist
      return false;
    }

    throw error;
  }

  return true;
};

(async () => {
  // Banner
  logBanner();

  const spinner = ora('Applying database migrations...').start();

  if (await doesUserHaveExistingDatabase()) {
    if (!(await hasDatabaseBeenMigratedToPrisma())) {
      try {
        await migrateFromSequelizeToPrisma();
      } catch (error) {
        if ((error as ExecaError).stderr) {
          spinner.fail('Failed to apply database migrations (going from Sequelize to Prisma):');
          console.error((error as ExecaError).stderr);
          process.exit(1);
        } else {
          throw error;
        }
      }
    }
  }

  try {
    await execa('prisma', ['migrate', 'deploy'], {preferLocal: true});
  } catch (error: unknown) {
    if ((error as ExecaError).stderr) {
      spinner.fail('Failed to apply database migrations:');
      console.error((error as ExecaError).stderr);
      process.exit(1);
    } else {
      throw error;
    }
  }

  spinner.succeed('Database migrations applied.');

  await startBot();
})();
