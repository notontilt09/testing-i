const { repair, success, fail } = require('./enhancer.js');

describe('enhancer.js', () => {
    describe('success(item)', () => {
        const item1 = {name: 'shield', displayName: '[+10] shield', type: 'armor', durability: 50, enhancement: 10}
        const item2 = {name: 'shield', displayName: '[+15] shield', type: 'armor', durability: 50, enhancement: 15}
        const item3 = {name: 'shield', displayName: '[PEN] shield', type: 'armor', durability: 50, enhancement: 20}
        const item4 = {name: 'shield', displayName: '[+2] shield', type: 'armor', durability: 5, enhancement: 2}
        it('adds one to enhancement and updates name while enhancement displayed in numbers', () => {
            expect(success(item1)).toEqual({name: 'shield', displayName: '[+11] shield', type: 'armor', durability: 50, enhancement: 11})
        })
        it('adds one to enhancement and updates name with named enhancement', () => {
            expect(success(item2)).toEqual({name: 'shield', displayName: '[PRI] shield', type: 'armor', durability: 50, enhancement: 16})
            expect(success(item3)).toEqual({name: 'shield', displayName: '[PEN] shield', type: 'armor', durability: 50, enhancement: 20})
        })
        it('returns cannot enhance string if durability too low', () => {
            expect(success(item4)).toBe('durability to low for enhancement')
        })
    })
    
    describe('fail(item)', () => {
        // armor with enhancement too low to fail
        const item1 = {name: 'shield', displayName: '[+2] shield', type: 'armor', durability: 20, enhancement: 2}
        // weapon with enhancement too low to fail
        const item2 = {name: 'axe', displayName: '[+6] axe', type: 'weapon', durability: 20, enhancement: 6}
        // armor < 15 enhancement
        const item3 = {name: 'shield', displayName: '[+10] shield', type: 'armor', durability: 20, enhancement: 10}
        // weapon < 15 enhancement
        const item4 = {name: 'axe', displayName: '[+10] axe', type: 'weapon', durability: 20, enhancement: 10}
        // armor >14 enhancement
        const item5 = {name: 'shield', displayName: '[DUO] shield', type: 'armor', durability: 20, enhancement: 17}
        // weapon >14 enhancement
        const item6 = {name: 'axe', displayName: '[DUO] axe', type: 'weapon', durability: 20, enhancement: 17}
        it('returns cannot fail string if enhancement too low', () => {
            expect(fail(item1)).toBe('cannot fail, enhancement is too low');
            expect(fail(item2)).toBe('cannot fail, enhancement is too low');
        })
        it('decreases durability by 5 for enhancements in middle range', () => {
            expect(fail(item3)).toEqual({name: 'shield', displayName: '[+10] shield', type: 'armor', durability: 15, enhancement: 10})
            expect(fail(item4)).toEqual({name: 'axe', displayName: '[+10] axe', type: 'weapon', durability: 15, enhancement: 10})
        })
        it('decreases durability by 10 for enhancements > 14 and decreases enhancement by 1 if > 16', () => {
            expect(fail(item5)).toEqual({name: 'shield', displayName: '[PRI] shield', type: 'armor', durability: 10, enhancement: 16})
            expect(fail(item6)).toEqual({name: 'axe', displayName: '[PRI] axe', type: 'weapon', durability: 10, enhancement: 16})
        })

    })

    describe('repair(item)', () => {
        it('restores durability property of item to 100', () => {
            expect(repair({ durability: 50 })).toEqual({ durability: 100 })
        })
        it('returns null if object doesn\'t have a durability property', () => {
            expect(repair({ test: 50 })).toEqual(null)
        })
    })
})