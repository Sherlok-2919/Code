// Pre-approved teachers list
export const approvedTeachers = [ 
    "Dr. Pranati Rakshit",
    "Dr. Amrita Namtirtha",
    "Mrs. Jayshree Bhattacharya", 
    "Dr. Bikramjit Sarkar", 
    "Mr. Sumanta Chatterjee", 
    "Mrs. Jayeeta Ghosh", 
    "Mr. Pijush Kanti Ghosh", 
    "Mr. Debashish Saha Roy", 
    "Mr. Raja Dey", 
    "Mr. Kaushik Roy Choudhury", 
    "Dr. Uddalak Mitra", 
    "Mr. Sanket Dan", 
    "Ms. Sanjukta Chatterjee", 
    "Ms. Purba Mukhopadhyay", 
    "Mr. Shirshendu Dutta", 
    "Dr. Ira Nath", 
    "Mr. Asim Kumar Paul", 
    "Mr. Amit Bera", 
    "Ms. Nandita Pasari",
    "Ms. Smriti Dey",
    "Ms. Rakhi Dey", 
    "Mr. Pandey Ji",
    "Mr. Subhendu Banarjee"
      ];
      
      export const isTeacherApproved = (name: string): boolean => {
        return approvedTeachers.some(teacher => 
          teacher.toLowerCase() === name.toLowerCase().trim()
        );
      };
    