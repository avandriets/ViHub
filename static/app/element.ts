/**
 * Created by AVAndriets on 04.10.16.
 */

export class Element {
    id: number;
    parent: number;
    name: string;
    description: string;
    element_type: string;
    is_delete: number;
    is_favorite: boolean;
    created_at: string;
    updated_at: string;
    owner: number;
    username: string;
    first_name: string;
    last_name: string;
}

export class Favorite extends Element{
    element: number;
    element_created_at: string;
    element_updated_at: string;
    element_owner: number;
}