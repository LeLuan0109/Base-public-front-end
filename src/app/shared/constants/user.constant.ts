import { LabelValue } from '../models/label-value.model';

//trạng thái
export const ROLE = {
	admin: { label: 'Quản trị hệ thống', value: 1 },
	expert: { label: 'Chuyên viên', value: 2 },
	user: { label: 'Người sử dụng', value: 3 }
};

export const ROLE_OPT: LabelValue[] = [
	ROLE.admin,
	ROLE.expert,
	ROLE.user
];

export const GENDER_OPT = [{
	label: '', value: 0
}]

export const POSITION = {

}

export const POSITION_OPT = [{
	label: '', value: 0
}]



