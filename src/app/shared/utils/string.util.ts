
export const showDeleteLabel = (records: number) => {
    return (records > 1 ? `Bạn đang chọn xóa ${records} bản ghi cùng lúc?` :
        `Bạn thực sự muốn xóa?`) + `<br> Nhấn nút "Xóa" để tiếp tục hoặc nhấn nút "Hủy" để hủy bỏ thao tác.`;
}

export const showChangeStatusLabel = (status: boolean) => {
    return `Bạn thự sự muốn ${status ? 'duyệt' : 'huỷ'}?<br>Nhấn nút "Đồng ý" để tiếp tục hoặc nhấn nút "Hủy" để hủy bỏ thao tác.`;
}

export const showChangeSentimentLabel =  `Bạn thự sự muốn thay đổi sắc thái?<br> Nhấn nút "Đồng ý" để tiếp tục hoặc nhấn nút "Hủy" để hủy bỏ thao tác.`;

export const showChangeNoteLabel = (status: boolean) => {
    return `Bạn thự sự muốn ${status ? 'bật' : 'tắt'} ghi chú?<br> Nhấn nút "Đồng ý" để tiếp tục hoặc nhấn nút "Hủy" để hủy bỏ thao tác.`;
}