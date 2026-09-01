export type Campaign = Readonly<{
  name: string;
  subject: string;
  content: string;
  tags: readonly string[];
}>;

/**
 * Prototype Pattern creates new objects by copying a configured prototype
 * instead of rebuilding the object from scratch.
 */
export class CampaignPrototype {
  private readonly campaign: {
    name: string;
    subject: string;
    content: string;
    tags: string[];
  };

  constructor(campaign: Campaign) {
    this.campaign = {
      name: campaign.name,
      subject: campaign.subject,
      content: campaign.content,
      tags: [...campaign.tags],
    };
  }

  clone = (): CampaignPrototype => new CampaignPrototype(this.campaign);

  setName = (name: string): this => {
    this.campaign.name = name;
    return this;
  };

  setSubject = (subject: string): this => {
    this.campaign.subject = subject;
    return this;
  };

  addTag = (tag: string): this => {
    this.campaign.tags.push(tag);
    return this;
  };

  toCampaign = (): Campaign => ({
    name: this.campaign.name,
    subject: this.campaign.subject,
    content: this.campaign.content,
    tags: Object.freeze([...this.campaign.tags]),
  });
}
