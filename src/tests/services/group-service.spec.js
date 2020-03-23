const groupService = require('../../services/group-service');
const Group = require('../../models/group');

const groupId = 2;
const notExistGroupId = 4444;

const groupData = { name: 'Users', permissions: 'WRITE', id: groupId };
const requestData = { name: groupData.name, permissions: groupData.permissions };

const groups = [
    groupData,
    { ...groupData, ...{ name: 'Moderators' } },
    { ...groupData, ...{ name: 'Admins' } }
];

jest.spyOn(Group, 'findAll').mockImplementation(() => {
    return groups;
});

jest.spyOn(Group, 'findByPk').mockImplementation((id) => {
    if (id === groupId) {
        return { get: () => groupData };
    }

    return null;
});

jest.spyOn(Group, 'create').mockImplementation(() => groupData);
jest.spyOn(Group, 'update').mockImplementation(() => groupData);
jest.spyOn(Group, 'destroy').mockImplementation(() => true);

describe('groupService', () => {
    describe('findAllGroups()', () => {
        it('should return all groups', async () => {
            const allGroups = await groupService.findAllGroups();
            expect(allGroups).toEqual(groups);
        });
    });

    describe('findGroup()', () => {
        it('should return NULL if group not exists', async () => {
            const group = await groupService.findGroup(notExistGroupId);
            expect(group).toEqual(null);
        });

        it('should return a group if it exists', async () => {
            const group = await groupService.findGroup(groupId);
            expect(group).toEqual(groupData);
        });
    });

    describe('createGroup()', () => {
        it('should return a new group object', async () => {
            const group = await groupService.createGroup(requestData);
            expect(group).toEqual(groupData);
        });
    });

    describe('updateGroup()', () => {
        it('should return an updated group object', async () => {
            const group = await groupService.updateGroup(groupId, requestData);
            expect(group).toEqual(groupData);
        });
    });

    describe('deleteGroup()', () => {
        it('should return TRUE in the successful deletion', async () => {
            const status = await groupService.deleteGroup(groupId);
            expect(status).toBeTruthy();
        });
    });
});
