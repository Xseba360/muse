import {Innertube} from 'youtubei.js';
import {injectable} from 'inversify';

@injectable()
export default class InnertubeProvider {
  private instance: Innertube | null = null;

  async get(): Promise<Innertube> {
    if (!this.instance) {
      this.instance = await Innertube.create({
        generate_session_locally: true,
      });
    }

    return this.instance;
  }
}
