import {Innertube, ClientType} from 'youtubei.js';
import {injectable} from 'inversify';

@injectable()
export default class InnertubeProvider {
  private webInstance: Innertube | null = null;
  private iosInstance: Innertube | null = null;

  async get(): Promise<Innertube> {
    if (!this.webInstance) {
      this.webInstance = await Innertube.create({
        client_type: ClientType.WEB,
      });
    }

    return this.webInstance;
  }

  async getStreaming(): Promise<Innertube> {
    if (!this.iosInstance) {
      this.iosInstance = await Innertube.create({
        client_type: ClientType.IOS,
      });
    }

    return this.iosInstance;
  }
}
