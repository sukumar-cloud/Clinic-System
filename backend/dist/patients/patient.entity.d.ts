export declare class Patient {
    id: number;
    fullName: string;
    phone?: string;
    gender?: 'male' | 'female' | 'other' | 'unknown';
    dob?: Date | null;
    address?: string | null;
    notes?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
