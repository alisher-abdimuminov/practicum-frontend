export interface Response<T = string> {
    status: "error" | "success";
    code: string;
    data: T
}

export interface Area {
    pk: number;
    name: string;
    coord1: string;
    coord2: string;
    coord3: string;
    coord4: string;
}

export interface User {
    uuid: string;

    username: string;
    full_name: string;
    phone: string;
    group: string;
    passport_number: string;
    faculty: string;
    payment_method: string;
    gpa: number;
    image: string;
    role: "admin" | "marketing" | "teacher" | "student";

    token: string;
}

export interface Teacher {
    uuid: string;
    username: string;
    full_name: string;
}

export interface Student {
    uuid: string;
    username: string;
    full_name: string;
    group: string;
    level: string;
    faculty: string;
    payment_method: string;
    gpa: number;
    image: string;
}

export interface Task {
    pk: number;
    group: Group;
    name: string;
    teacher: Teacher;
    description: string;
    created: string;
}

export interface Submit {
    pk: number;
    task: Task;
    student: Student;
    status: "uploaded" | "marked" | "rejected";
    point: number;
    file: string;
    created: string;
}

export interface Attendance {
    uuid: string;
    student: Student;
    area: Area;
    status: "arrived" | "late" | "failed";
    image: string;
    created: string;
}

export interface Group {
    pk: number;
    name: string;
}

export interface Schedule {
    groups: Group[];
    area: Area;
    weekday: string;
}
