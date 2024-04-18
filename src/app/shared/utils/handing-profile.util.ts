import { ESocialSource, ESocialSourceType, ESourceGroup } from 'src/app/social-source/models/social-source.model';


export const handingProfile = (
  name: string,
  source: ESocialSource,
  profileId: string,
  sourceType?: ESocialSourceType,
  groupIds?: any[]
): { name: string, profileId: string, url: string, source?: ESocialSource, sourceType?: ESocialSourceType, groupIds?: any[], autoApprove?: boolean } | null => {
  if (source === ESocialSource.Facebook) {
    if (profileId.includes('facebook.com')) {
      const id = profileId
        .replace('https://', '')
        .replace('www.', '')
        .replace('facebook.com/', '');
      const ids = id.split('/');
      if (ids.length > 0) {
        const id = ids[ids.length - 1];
        if (id.includes("?") || !id) {
          return { name: name, profileId: ids[ids.length - 2], url: profileId, source: source, sourceType: sourceType, groupIds: groupIds };
        }
        return { name: name, profileId: id, url: profileId, source: source, sourceType: sourceType, groupIds: groupIds };
      }
      return null;
    }
    return { name: name, profileId: profileId, url: `https://www.facebook.com/${profileId}`, source: source, sourceType: sourceType, groupIds: groupIds };
  }

  if (source === ESocialSource.Tiktok) {
    if (profileId.includes('twitter.com')) {
      const id = profileId
        .replace('https://', '')
        .replace('www.', '')
        .replace('twitter.com/', '');
      const ids = id.split('/');
      if (ids.length > 0) {
        return { name: name, profileId: ids[0], url: profileId, sourceType: sourceType, groupIds: groupIds };
      }
      return null;
    }
    return { name: name, profileId: profileId, url: `https://twitter.com/${profileId}`, sourceType: sourceType, groupIds: groupIds };
  }

  return { name: name, profileId: profileId, url: profileId, sourceType: sourceType, groupIds: groupIds };
};


export class ProfileParse<T> {

  public name: string;
  public source: ESocialSource | string
  public profileId: string
  public sourceType?: ESocialSourceType | string
  public groupIds?: number[] | undefined
  public url?: string | null
  public autoApprove?: boolean | undefined

  constructor(data: { name: string, profileId: string, source: ESocialSource | any, sourceType: ESocialSourceType | string, groupIds?: number[] | undefined, autoApprove?: boolean | undefined }) {
    this.name = data?.name
    this.profileId = data?.profileId;
    this.sourceType = data?.sourceType ?? ''
    this.source = data?.source
    this.groupIds = data?.groupIds
    this.autoApprove = data?.autoApprove || undefined
    this._getSourceUrl()
  }

  private _getSourceUrl() {
    switch (this.source) {
      case ESocialSource.Facebook:
        this._getFacebookProfile()

        break;

      case ESocialSource.Tiktok:
        this._getTiktokProfile()
        break

      case ESocialSource.Youtube:
        this._getYoutubeProfile()
        break;
    }
  }

  private _getFacebookProfile() {
    const idLower = this.profileId?.toLocaleLowerCase();
    if (idLower?.includes('facebook.com')) {
      const urlCopy = this.profileId;
      if (idLower.includes('profile.php')) {
        let id = idLower.match(/id=[0-9]+/g);
        if (id && id?.length > 0) {
          this.profileId = id[0].split('=')[1];
        }
      } else {
        const index = idLower.indexOf('facebook.com');
        let id = this.profileId.substring(index + 12);
        if (id.startsWith("/")) {
          const ids = id.split("/");
          if (ids.length > 1) {
            if (ids[1] === 'group' || ids[1] === 'GROUP') {
              this.profileId = ids[2];
            } else {
              this.profileId = ids[1];
            }
          } else {
            this.profileId = ids[0];
          }
        } else {
          this.profileId = id;
        }
      }
      this.url = urlCopy;
    } else {
      this.url = this.sourceType === ESocialSourceType.Group ? `https://www.facebook.com/groups/${this.profileId}` : `https://www.facebook.com/${this.profileId}`
    }
  }

  private _getTiktokProfile() {
    const idLower = this.profileId?.toLocaleLowerCase();
    if (idLower?.includes('tiktok.com')) {
      const urlCopy = this.profileId;
      const index = idLower.indexOf('tiktok.com');
      if (index > -1) {
        let id = this.profileId.substring(index + 10);
        if (id.startsWith('/@')) {
          id = id.substring(2);
          if (id.includes('/')) {
            this.profileId = id.split('/')[0];
          } else {
            this.profileId = id;
          }
        }
      }
      this.url = urlCopy;
    }
    this.url = `https://www.tiktok.com/@${this.profileId}`
  }

  private _getYoutubeProfile() {
    const idLower = this.profileId?.toLocaleLowerCase();
    if (idLower?.includes('youtube.com')) {
      const urlCopy = this.profileId;
      const index = idLower.indexOf('youtube.com');
      if (index > -1) {
        let id = this.profileId.substring(index + 10);
        if (id.startsWith('/@')) {
          id = id.substring(2);
          if (id.includes('/')) {
            this.profileId = id.split('/')[0];
          } else {
            this.profileId = id;
          }
        }
      }
      this.url = urlCopy;
    }
    this.url = `https://www.youtube.com/@${this.profileId}`
  }

}