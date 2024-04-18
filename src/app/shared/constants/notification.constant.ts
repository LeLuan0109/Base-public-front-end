export const TIME_TYPE = {
    hour: { label: 'Hàng giờ', value: 1 },
    day: { label: 'Hàng ngày', value: 2 },
    week: { label: 'Hàng tuần', value: 3 },
};

export const TIME_TYPE_OPT = [
    TIME_TYPE.hour,
    TIME_TYPE.day,
    TIME_TYPE.week
];

export const DAY_OF_WEEK = {
    mon: { label: 'Thứ 2', value: 'Mon' },
    tue: { label: 'Thứ 3', value: 'Tue' },
    wed: { label: 'Thứ 4', value: 'Wed' },
    thu: { label: 'Thứ 5', value: 'Thu' },
    fri: { label: 'Thứ 6', value: 'Fri' },
    sat: { label: 'Thứ 7', value: 'Sat' },
    sun: { label: 'Chủ nhật', value: 'Sun' },
}

export const DAY_OF_WEEK_OPT = [
    DAY_OF_WEEK.mon,
    DAY_OF_WEEK.tue,
    DAY_OF_WEEK.wed,
    DAY_OF_WEEK.thu,
    DAY_OF_WEEK.fri,
    DAY_OF_WEEK.sat,
    DAY_OF_WEEK.sun,
]

export const HOUR_OF_DAY_OPT = Array.from(Array(10), (_, i) => ({ label: `${i}`, value: i }));

export const SEND_TYPE = {
    ntf: { label: 'Notification', value: 1 },
    email: { label: 'Email', value: 2 }
}

export const FREQUENCY = {
    zero: { label: 'Không nhận', value: 0 },
    one: { label: 'Ngay lập tức', value: 1 },
    two: { label: 'Mỗi 2h', value: 2 },
    fuor: { label: 'Mỗi 4h', value: 4 },
    eight: { label: 'Mỗi 8h', value: 8 },
}

export const FREQUENCY_OPT = [
    FREQUENCY.zero,
    FREQUENCY.one,
    FREQUENCY.two,
    FREQUENCY.fuor,
    FREQUENCY.eight,
]