const { format_date, format_plural } = require('../utils/helpers');



test('format_date() returns a date string', () => {
    const date = new Date('2022-03-20 16:12:03');

    expect(format_date(date)).toBe('3/20/2022');
});

test('format_plural() returns a pluralized word',()=> {
    expected(format_plural("tiger", 2)).toBe("tigers");

    expected(format_plural("lion", 1)).toBe("lion");
    
});