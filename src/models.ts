interface Laboratory {
	id: number;
	name: string;
	description: string;
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
}

export type {
	Laboratory,
	Professor,
	LaboratoryCollaborator,
	ServiceRequest
};
