import Ember from 'ember';
import ProjectProgressMixin from 'phoenix/mixins/project-progress';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';

export default Ember.ObjectController.extend(ProjectProgressMixin, ModelsNavigationMixin, {
  needs: ['whiteboards/whiteboard'],
  whiteboard: Ember.computed.oneWay('controllers.whiteboards/whiteboard'),

  navigableModels: Ember.computed.oneWay('whiteboard.projects.arrangedContent'),

  modelRouteParams: Ember.computed('whiteboard.id', function () {
    return ['whiteboards.whiteboard.project', this.get('whiteboard.id')];
  }),

  anglesSorting: ['createdAt:desc'],
  angles: Ember.computed.sort('model.angles', 'anglesSorting'),

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('whiteboards.whiteboard', this.get('whiteboard.id'));
    }
  }
});