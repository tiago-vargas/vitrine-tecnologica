interface Laboratory {
	id: number;
	name: string;
	fullName: string,
	description: string;
	offeredServices: string[];
	responsibleProfessorId: number;
}

interface Professor {
	id: number;
	name: string;
	email: string;
	areaOfExpertise: string;
}

interface LaboratoryCollaborator {
	id: number;
	laboratoryId: number;
	professorId: number;
}

interface ServiceRequest {
	id: number;
	laboratoryId: number;
	requesterName: string;
	requesterEmail: string;
	description: string;
	requesterCompany: string,
	requesterPhoneNumber: string,
}

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
