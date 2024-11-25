'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        let data = [];
        function set_data(
            id,
            title,
            total_seat
        ) {
            data.push({
                id,
                title,
                total_seat,
                created_at: '2024-11-14',
                updated_at: '2024-11-14',
            });
        }
        set_data(
            1,
            'toyota 001',
            '15',
        );
        set_data(
            2,
            'toyota 002',
            '15',
        );

        await queryInterface.bulkDelete('cars', null, {});
        await queryInterface.bulkInsert('cars', data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         
         npx sequelize-cli db:seed:all --config src/configs/db.json --seeders-path src/modules/user_management/user_admin/models/seeders
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('cars', null, {});
    },
};
