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
    if (item.type === 'armor') {
        if (item.enhancement < 5) {
            return 'cannot fail, enhancement is too low'
        } else {
            if (item.enhancement >=5 && item.enhancement <= 14) {
                item.durability -= 5;
                return item;
            } else {
                item.durability -= 10;
                item.enhancement > 16 ? item.enhancement-- : item.enhancement
                item.displayName = generateName(item.enhancement) + ' ' + item.name
                return item;
            }
        }
    } else if (item.type === 'weapon') {
        if (item.enhancement < 7) {
            return 'cannot fail, enhancement is too low'
        } else {
            if (item.enhancement >= 7 && item.enhancement <= 14) {
                item.durability -= 5;
                return item;
            } else {
                item.durability -= 10;
                item.enhancement > 16 ? item.enhancement-- : item.enhancement
                item.displayName = generateName(item.enhancement) + ' ' + item.name
                return item;
            }
        }
    }

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

