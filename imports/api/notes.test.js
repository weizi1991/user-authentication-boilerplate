import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';

if (Meteor.isServer) {
    describe('notes', function () {
        const noteOne = {
            _id: 'testNoteId1',
            title: 'My Title',
            body: 'My body for note',
            updatedAt: 0,
            userId: 'testUserId1'
        };
        const noteTwo = {
            _id: 'testNoteId2',
            title: 'Things To Buy',
            body: 'Couch',
            updatedAt: 0,
            userId: 'testUserId2'
        };
         beforeEach(function (params) {
             Notes.remove({ });
             Notes.insert(noteOne);
         });
        it("should insert new note", function () {
             const userId = 'testId';
             const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId});
            
            expect(Notes.findOne({_id, userId})).toBeTruthy();
        //    done();
        });

        it('should not insert note if not authenticated', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.insert']();
            }).toThrow();
        });

        it('should remove the note', function() {
            Meteor.server.method_handlers['note.remove'].apply({ userId: 'testUserId1'}, ['testNoteId4']);
            expect(Notes.findOne({ _id: 'testNoteId1'})).toBeFalsy();
        })
        it('should not remove note if unauthenticated', function () {
            expect(() => {
              Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
            }).toThrow();
        });
      
        it('should not remove note if invalid _id', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId});
            }).toThrow();
        });
    });
} 