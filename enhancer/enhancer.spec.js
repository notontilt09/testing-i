const { repair, success, fail } = require('./enhancer.js');

describe('enhancer.js', () => {
    describe('success(item)', () => {
        const item1 = {name: 'shield', displayName: '[+10] shield', type: 'armor', durability: 50, enhancement: 10}
        const item2 = {name: 'shield', displayName: '[+15] shield', type: 'armor', durability: 50, enhancement: 15}
        const item3 = {name: 'shield', displayName: '[PEN] shield', type: 'armor', durability: 50, enhancement: 20}
        const item4 = {name: 'shield', displayName: '[+2] shield', type: 'armor', durability: 5, enhancement: 2}
        it('adds one to enhancement and updates name', () => {
            expect(success(item1)).toEqual({name: 'shield', displayName: '[+11] shield', type: 'armor', durability: 50, enhancement: 11})
            expect(success(item2)).toEqual({name: 'shield', displayName: '[PRI] shield', type: 'armor', durability: 50, enhancement: 16})
            expect(success(item3)).toEqual({name: 'shield', displayName: '[PEN] shield', type: 'armor', durability: 50, enhancement: 20})
            expect(success(item4)).toBe('durability to low for enhancement')
        })
    })

    describe('fail(item)', () => {

    })

    describe('repair(item)', () => {
        it('restores durability property of item to 100', () => {
            expect(repair({ durability: 50 })).toEqual({ durability: 100 })
            expect(repair({ test: 50 })).toEqual(null)
        })
    })
})