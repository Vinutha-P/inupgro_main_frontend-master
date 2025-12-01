'use client';

export default function NewsCards() {
  const dummyData = [
    {
      title: 'Lorem Ipsum Dolar',
      paragraphs: [
        `Green Valley International School in New Delhi has introduced an exciting new STEM (Science, Technology, Engineering, and Mathematics) program aimed at enhancing students’ interest and skills in these critical fields. The program, which will be integrated into the curriculum starting this academic year, focuses on hands-on learning and real-world problem-solving.`,
        `The initiative is designed to encourage students to explore innovative approaches to science and technology while building critical thinking and teamwork skills. School Principal, Mrs. Anjali Kapoor, emphasized that the program will prepare students for future careers in high-demand sectors and provide a solid foundation for higher education in these fields. The program will also feature workshops, robotics labs, coding classes, and guest lectures from industry experts.`,
      ],
    },
    {
      title: 'Lorem Ipsum Dolar',
      paragraphs: [
        `Green Valley International School in New Delhi has introduced an exciting new STEM (Science, Technology, Engineering, and Mathematics) program aimed at enhancing students’ interest and skills in these critical fields. The program, which will be integrated into the curriculum starting this academic year, focuses on hands-on learning and real-world problem-solving.`,
        `The initiative is designed to encourage students to explore innovative approaches to science and technology while building critical thinking and teamwork skills. School Principal, Mrs. Anjali Kapoor, emphasized that the program will prepare students for future careers in high-demand sectors and provide a solid foundation for higher education in these fields. The program will also feature workshops, robotics labs, coding classes, and guest lectures from industry experts.`,
      ],
    },
    // You can add more items if needed
  ];

  // Extract the first title only (and ignore repeated titles)
  const uniqueTitle = dummyData[0]?.title || 'News';

  // Combine all paragraphs from all items
  const allParagraphs = dummyData.flatMap(item => item.paragraphs);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">{uniqueTitle}</h2>
        {allParagraphs.map((text, idx) => (
          <p key={idx} className="text-sm text-gray-700 leading-relaxed">
            {highlightImportantText(text)}
          </p>
        ))}
      </div>
    </div>
  );
}

// Highlight important sentences
function highlightImportantText(text: string) {
  const boldMatches = [
    'Green Valley International School in New Delhi has introduced an exciting new STEM \\(Science, Technology, Engineering, and Mathematics\\) program aimed at enhancing students’ interest and skills in these critical fields\\.',
    'The program, which will be integrated into the curriculum starting this academic year, focuses on hands-on learning and real-world problem-solving\\.',
    'Mrs\\. Anjali Kapoor, emphasized that the program will prepare students for future careers in high-demand sectors and provide a solid foundation for higher education in these fields\\.',
    'The program will also feature workshops, robotics labs, coding classes, and guest lectures from industry experts\\.',
  ];

  let finalText = text;

  boldMatches.forEach((match) => {
    const regex = new RegExp(`(${match})`, 'g');
    finalText = finalText.replace(regex, `<strong class="font-semibold text-gray-800">$1</strong>`);
  });

  return <span dangerouslySetInnerHTML={{ __html: finalText }} />;
}
