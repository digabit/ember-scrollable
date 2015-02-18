import Ember from 'ember';
import { test } from 'ember-qunit';
import '../../helpers/define-fixture';
import testHelper from '../../test-helper';

const projectName = 'Project Name',
      advisorName = 'Johnny Advisor',
      advisorJobTitle = 'Vice President',
      advisorCompanyName = 'Apple',
      advisorEmail = 'advisor@email.com',
      advisorPhoneNumber = '+1 555-123-4567',
      clientContactName = 'Bob Client',
      clientAccountName = 'McKinsey & Company San Francisco',
      clientEmail = 'client@email.com',
      clientPhoneNumber = '+1 555-321-9000',
      checklistStatus = 'Checklist Complete',
      scheduledCallTime = "2015-02-20T10:00:00.000-08:00";

module("Upcoming interactions", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    defineFixture('GET', '/interactions', { response: {
     "advisors": [
        {
          "id": 256512,
          "avatar_url": null,
          "emails": [advisorEmail],
          "name": advisorName,
          "phone_numbers": [advisorPhoneNumber],
          "job_title": advisorJobTitle,
          "company_name": advisorCompanyName
        }
     ],
     "client_contacts": [
        {
          "id": 21387,
          "avatar_url": null,
          "emails": [clientEmail],
          "name": clientContactName,
          "phone_numbers": [clientPhoneNumber],
          "client_account_id": 485
        }
     ],
     "client_accounts": [
        {
           "id": 485,
           "name": clientAccountName
        }
     ],
     "projects": [
        {
           "id": 32522,
           "status": "high",
           "name": projectName,
           "client_code": "MCKU",
           "details_url": "/projects/32522",
           "index": 3,
           "created_at": "2015-01-23T21:01:33.615+00:00",
           "angle_ids": [40380],
           "analyst_1_id": 6565389
        }
     ],
     "angles": [],
     "angle_team_memberships": [],
     "users": [],
     "interactions": [
        {
          "id": 1,
          "scheduled_call_time": scheduledCallTime,
          "advisor_id": 256512,
          "client_contact_id": 21387,
          "project_id": 32522
        }
      ]
    }});

    defineFixture('GET', '/users', { params: { team_id: '1' }, response: {
      "users": []
    }});
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
  }
});

test("Show interaction details", function() {
  visit('/dashboard/interactions/1');

  andThen(function() {
    var $interaction = find('.interaction');

    var interactionDetails = {
      titleProjectName: $interaction.find('h1 small').text().trim(),
      titleAdvisorName: $interaction.find('h1 span').text().trim(),
      advisorName: $interaction.find('.advisor .name').text().trim(),
      currentPosition: $interaction.find('.advisor .current-position').text().trim(),
      advisorEmail: $interaction.find('.advisor .email span').text().trim(),
      advisorPhoneNumber: $interaction.find('.advisor .phone span').text().trim(),
      clientContactName: $interaction.find('.client .name').text().trim(),
      clientAccountName: $interaction.find('.client .current-position').text().trim(),
      clientEmail: $interaction.find('.client .email span').text().trim(),
      clientPhoneNumber: $interaction.find('.client .phone span').text().trim(),
      callTimeFromNow: $interaction.find('.time .from-now').text().trim(),
      absoluteCallTime: $interaction.find('.time .absolute').text().trim()
    };

    deepEqual(interactionDetails, {
      titleProjectName: projectName,
      titleAdvisorName: advisorName,
      advisorName: advisorName,
      currentPosition: `${advisorJobTitle} at ${advisorCompanyName}`,
      advisorEmail: advisorEmail,
      advisorPhoneNumber: advisorPhoneNumber,
      clientContactName: clientContactName,
      clientAccountName: clientAccountName,
      clientEmail: clientEmail,
      clientPhoneNumber: clientPhoneNumber,
      callTimeFromNow: moment(scheduledCallTime).fromNow(),
      absoluteCallTime: moment(scheduledCallTime).format('h:mm a')
    });
  });
});

test("Show upcoming interactions list", function() {
  visit('/dashboard');

  andThen(function() {
    var $interaction = find('.upcoming-interactions article:first');

    var interactionListItem = {
      advisorName: $interaction.find('.title span').text().trim(),
      projectName: $interaction.find('.title small').text().trim(),
      checklistStatus: $interaction.find('.checklist-status span').text().trim(),
      scheduledCallTime: $interaction.find('.time').text().trim(),
    };

    deepEqual(interactionListItem, {
      advisorName: advisorName,
      projectName: projectName,
      checklistStatus: checklistStatus,
      scheduledCallTime: moment(scheduledCallTime).fromNow(),
    });
  });
});
