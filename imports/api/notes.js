import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({

    'notes.insert'(){
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        return Notes.insert({
            title: '',
            body: '',
            userId: this.userId,
            updatedAt: moment().valueOf(),
        })
    },
    'notes.remove'(_id) {
        // check for userid, else throw error

        //use simple schema to validate the id with length greater than 1

        //node.remove to remove the note
    }
})