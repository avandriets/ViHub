export class TransportObject {
    type: string;
    object: BaseObject;
}

export class BaseObject {
    id: number;
    created_at: string;
    updated_at: string;
}

export class ElementVi extends BaseObject {
    element: number;
    parent: number;
    name: string;
    description: string;
    element_type: string;
    is_delete: number;
    is_favorite: boolean;
    owner: number;
    username: string;
    first_name: string;
    last_name: string;
}

export class Favorite extends ElementVi {
    element_created_at: string;
    element_updated_at: string;
    element_owner: number;
}

export class MessageVi extends BaseObject {
    element: number;
    subject: string;
    body: string;
    message_date: string;
    owner: number;
    username: string;
    first_name: string;
    last_name: string;
    getUserName(): string{
        return this.first_name + " " + this.last_name;
    }
}

export class NoteVi extends BaseObject {
    message: number;
    element: number;
    subject: string;
    body: string;
    private_note: boolean;
    owner: number;
    username: string;
    first_name: string;
    last_name: string;
}