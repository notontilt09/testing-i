module.exports = {
    repair,
    success,
    fail,
    generateName
}

function repair(item) {
    if (item.durability) {
        return {...item, durability: 100}
    } else {
        return null
    }
}

function success(item) {
    if (item.enhancement < 14 && item.durability > 24) {
        if (item.enhancement < 20) {
            item.enhancement++
        }
        item.displayName = generateName(item.enhancement) + ' ' + item.name
        return item
    }
    if (item.enhancement > 14 && item.durability > 10) {
        if (item.enhancement < 20) {
            item.enhancement++
        }
        item.displayName = generateName(item.enhancement) + ' ' + item.name
        return item
    }
    return 'durability to low for enhancement'
}

function fail(item) {

}

function generateName(lvl) {
    if (lvl === 0 ) {
        return ''
    } else if (lvl > 0 && lvl < 16) {
        return `[+${lvl}]`
    } else {
        switch(lvl) {
            case 16:
                return '[PRI]';
            case 17:
                return '[DUO]';
            case 18:
                return '[TRI]';
            case 19: 
                return '[TET]';
            default:
                return '[PEN]';

        }
    }
}

