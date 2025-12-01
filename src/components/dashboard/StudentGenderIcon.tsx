// import Image from 'next/image';

// type Student = {
//   name: string;
//   gender: 'Male' | 'Female';
// };

// export default function StudentGenderIcon({ student }: { student: Student }) {
//   const genderIcon =    student.gender === 'Male' ? '/icons/male.png' : '/icons/female.png';

//   return (
//     <div style={{ display: 'flex', alignItems: 'center' }}>
//       <Image
//         src={genderIcon}
//         alt={`${student.gender} icon`}
//         width={40}
//         height={80}
//       />
//       <span style={{ marginLeft: '8px' }}>{student.name}</span>
//     </div>
//   );
// }




import Image from 'next/image';

type Student = {
  gender: 'Male' | 'Female';
  // count: number;
  iconColor: string;
  change: number;
  changeType: 'increase' | 'decrease';
};

const students: Student[] = [
  {
    gender: "Male",
    // count: 24680,
    iconColor: "text-blue-300",
    change: 15,
    changeType: "increase",
  },
  {
    gender: "Female",
    // count: 3000,
    iconColor: "text-yellow-300",
    change: 8,
    changeType: "decrease",
  },
];

export default function StudentStats() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {students.map((student, index) => {
        const genderIcon = student.gender === "Male" ? "/male.png" : "/female.png";
        const arrow = student.changeType === "increase" ? "/trend-up.png" : "/trend-down.png";
        const changeColor = student.changeType === "increase" ? "text-green" : "text-red-600";

        return (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
          >
            <div className="flex flex-col gap-4">
              <div className={student.iconColor + " text-5xl"}>
                <Image src={genderIcon} alt={student.gender} width={40} height={40} />
              </div>
              <div>
                <p className="text-lg font-semibold">{student.gender}</p>
                <p className="text-sm text-gray-500">{student.gender} students</p>
              </div>
              <div className={`${changeColor} text-sm font-medium flex items-center gap-1`}>
                <Image src={arrow} alt={student.gender} width={20} height={20} />
                 {student.change}% 
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
