import { describe, expect, it } from 'vitest';

import { CampaignPrototype } from '@patterns/creational/prototype/prototype-pattern.js';

describe('Prototype Pattern', () => {
  it('clones a configured campaign with independent nested state', () => {
    const template = new CampaignPrototype({
      name: 'Product launch',
      subject: 'Introducing our new product',
      content: 'Discover what is new.',
      tags: ['launch'],
    });
    const regionalCampaign = template
      .clone()
      .setName('Product launch - Ukraine')
      .setSubject('Новий продукт вже тут')
      .addTag('ukraine')
      .toCampaign();

    expect(regionalCampaign).toEqual({
      name: 'Product launch - Ukraine',
      subject: 'Новий продукт вже тут',
      content: 'Discover what is new.',
      tags: ['launch', 'ukraine'],
    });
    expect(template.toCampaign()).toEqual({
      name: 'Product launch',
      subject: 'Introducing our new product',
      content: 'Discover what is new.',
      tags: ['launch'],
    });
    expect(regionalCampaign.tags).not.toBe(template.toCampaign().tags);
  });

  it('returns a read-only campaign value', () => {
    const campaign = new CampaignPrototype({
      name: 'Reminder',
      subject: 'Do not forget',
      content: 'A quick reminder.',
      tags: [],
    }).toCampaign();

    expect(Object.isFrozen(campaign.tags)).toBe(true);
  });
});
