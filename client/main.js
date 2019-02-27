import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import Modal from 'react-modal';

import {routes, onAuthChange} from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
})


Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById("app"));
})