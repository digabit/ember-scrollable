import Ember from 'ember';
import ProjectProgressMixin from 'phoenix/mixins/project-progress';

export default Ember.ObjectController.extend(ProjectProgressMixin, {
  needs: ['teams/team'],

  team: Ember.computed.oneWay('controllers.teams/team'),
  hasDeliveryTarget: Ember.computed.gt('deliveryTarget', 0),

  members: Ember.computed('model.members.[]', function() {
    return _(this.get('model.members')).without(this.get('lead'));
  }),

  actions: {
    show: function() {
      this.transitionToRoute('teams.team.project', this.get('team.id'), this.get('id'));
    }
  }
});
