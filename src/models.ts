interface Laboratory {
	id: number;
	name: string;
	fullName: string,
	description: string | null;
	offeredServices: string[] | null;
	responsibleProfessorId: number | null;
}

const mapLabDbToTs = (dbRow: any): Laboratory => ({
	...dbRow,
	fullName: dbRow.full_name,
	offeredServices: dbRow.offered_services,
	responsibleProfessorId: dbRow.responsible_professor_id,
});

interface Professor {
	id: number;
	name: string;
	email: string;
	areaOfExpertise: string;
}

const mapProfDbToTs = (dbRow: any): Professor => ({
	...dbRow,
	areaOfExpertise: dbRow.area_of_expertise,
});

interface LaboratoryCollaborator {
	// id: number;
	laboratoryId: number;
	professorId: number;
}

const mapLabCollabDbToTs = (dbRow: any): LaboratoryCollaborator => ({
	// id: dbRow.id,
	laboratoryId: dbRow.laboratory_id,
	professorId: dbRow.professor_id,
});

interface ServiceRequest {
	id: number;
	laboratoryId: number;
	date: string;
	description: string;
	requesterName: string;
	requesterEmail: string;
	requesterCompany: string;
	requesterPhoneNumber: string;
}

const mapServiceReqDbToTs = (dbRow: any): ServiceRequest => ({
	...dbRow,
	laboratoryId: dbRow.laboratory_id,
	requesterName: dbRow.requester_name,
	requesterEmail: dbRow.requester_email,
	requesterCompany: dbRow.requester_company,
	requesterPhoneNumber: dbRow.requester_phone_number,
});

interface User {
	id: number;
	username: string;
	password: string;
}

export type {
	Laboratory,
	Professor,
	LaboratoryCollaborator,
	ServiceRequest,
	User,
};

export {
	mapLabDbToTs,
	mapProfDbToTs,
	mapLabCollabDbToTs,
	mapServiceReqDbToTs,
};
