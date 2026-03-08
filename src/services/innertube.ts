import {Innertube, ClientType} from 'youtubei.js';
import {injectable} from 'inversify';

@injectable()
export default class InnertubeProvider {
  private webInstance: Innertube | null = null;

  async get(): Promise<Innertube> {
    if (!this.webInstance) {
      this.webInstance = await Innertube.create({
        client_type: ClientType.WEB,
      });
    }

    return this.webInstance;
  }

  async getStreaming(): Promise<Innertube> {
    return this.get();
  }
}
