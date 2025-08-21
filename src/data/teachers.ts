// Pre-approved teachers list
export const approvedTeachers = [
    "Dr. Sarah Johnson",
    "Prof. Michael Chen",
    "Ms. Emily Rodriguez",
    "Dr. James Wilson",
    "Prof. Lisa Anderson",
    "Mr. David Thompson",
    "Dr. Maria Garcia",
    "Prof. Robert Kim",
    "Ms. Jennifer Lee",
    "Dr. Christopher Brown",
    "Prof. Amanda Davis",
    "Mr. Kevin Martinez",
    "Dr. Rachel Taylor",
    "Prof. Steven Clark",
    "Ms. Nicole White",
    "Dr. Daniel Lewis",
    "Prof. Jessica Hall",
    "Mr. Mark Robinson",
    "Dr. Laura Walker",
    "Prof. Thomas Young"
  ];
  
  export const isTeacherApproved = (name: string): boolean => {
    return approvedTeachers.some(teacher => 
      teacher.toLowerCase() === name.toLowerCase().trim()
    );
  };