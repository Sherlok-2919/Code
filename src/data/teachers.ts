// Pre-approved teachers list
export const approvedTeachers = [ 
    "Dr. Pranati Rakshit",
    "Dr.Amrita Namatirtha",
    "Jayshree Bhattacharya", 
    "Bikramjit Sarkar", 
    "Sumanta Chatterjee", 
    "Jayeeta Ghosh", 
    "Pijush Kanti Ghosh", 
    "Debashish Saha Roy", 
    "Raja Dey", 
    "Kaushik Roy Choudhury", 
    "Uddalak Mitra", 
    "Sanket Dan", 
    "Sanjukta Chatterjee", 
    "Purba Mukhopadhyay", 
    "Shirshendu Dutta", 
    "Ira Nath", 
    "Asim Kumar Pal", 
    "Amit Bera", 
    "Nandita Pasari",
    "Smriti Dey",
    "Rakhi Dey",
    "Samiran Dey", 
    "Pandey Ji",
    "Subhendu Banarjee"
      ];
      
      export const isTeacherApproved = (name: string): boolean => {
        return approvedTeachers.some(teacher => 
          teacher.toLowerCase() === name.toLowerCase().trim()
        );
      };
    
