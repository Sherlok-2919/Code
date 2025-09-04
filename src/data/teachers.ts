// Pre-approved teachers list
export const approvedTeachers = [ 
    "Dr. Pranati Rakshit",
    "Dr. Amrita Namtirtha",
    "Mrs. Jayshree Bhattacharya", 
    "Dr. Bikramjit Sarkar", 
    "Mr. Sumanta Chatterjee", 
    "Mrs. Jayeeta Ghosh", 
    "Mr. Pijush Kanti Ghosh", 
    "Mr. Debasish Saha Roy", 
    "Mr. Raja Dey", 
    "Mr. Kaushik Roy Choudhury", 
    "Dr. Uddalak Mitra", 
    "Mr. Sanket Dan", 
    "Ms. Sanjukta Chatterjee", 
    "Ms. Purba Mukhopadhyay", 
    "Mr. Shirshendu Dutta", 
    "Dr. Ira Nath", 
    "Mr. Asim Kumar Pal", 
    "Mr. Amit Bera", 
    "Ms. Nandita Pasari",
    "Ms. Smrity Dey",
    "Ms. Rakhi Dey", 
    "Mr. Pandey Ji",
    "Mr. Subhendu Banerjee"
      ];
      
      export const isTeacherApproved = (name: string): boolean => {
        return approvedTeachers.some(teacher => 
          teacher.toLowerCase() === name.toLowerCase().trim()
        );
      };
    
