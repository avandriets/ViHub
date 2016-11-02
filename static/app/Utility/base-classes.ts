export class TransportObject {
    type: string;
    object: BaseObject;
}

export class BaseObject {
    id: number;
    created_at: string;
    updated_at: string;
}

export abstract class BasePermissions {
    abstract has_object_permission(obj: any, user: UserVi): boolean;
}

export class IsOwnerReadOnlyPermission extends BasePermissions {
    has_object_permission(obj: any, user: UserVi): boolean {

        if (obj.owner == user.id) {
            return true;
        } else {
            return false;
        }
    }
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
    message_type: string;
    body_preview:string;
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

export class UserVi extends BaseObject {
    first_name: string;
    last_name: string;
    email: string;
    provider: string;
}
