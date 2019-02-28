import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';

if (Meteor.isServer) {
    describe('notes', function () {
        beforeEach(function (params) {
            Notes.remove({});
            Notes.insert({
                _id: 'testNoteId1',
                title: 'title 1',
                body: 'my body for note',
                updatedAt: 0,
                userId: 'testUserId1'
            })
        })
        it("should insert new note", function () {
            const userId = 'testId';
            const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId});
            
           expect(Notes.findOne({_id, userId})).toBeTruthy();
        });

        it('should not insert note if not authenticated', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.insert'].apply({ });
            }).toThrow();
        })

        it('should remove the note', function() {
            Meteor.server.method_handlers['note.remove'].apply({ userId: 'testUserId1'}, ['testNoteId1']);
            expect(Notes.findOne({ _id: 'testNoteId1'})).toBeFalsy();
        })
    });
} 