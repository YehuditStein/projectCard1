import { Container, Card } from "react-bootstrap";

const AboutPage = () => {
  return (
    <Container className="py-5">
      <Card className="p-4 shadow-sm">
        <h1 className="text-center mb-4">אודות BCard</h1>
        <p>
          אפליקציית BCard היא מערכת לניהול כרטיסי ביקור, המיועדת למשתמשים פרטיים ועסקיים.
          משתמשים יכולים להירשם, להתחבר, לנהל כרטיסים אישיים, לסמן מועדפים, ולעצב את סביבת העבודה האישית שלהם במצב כהה ובהיר.
        </p>
        <p>
          האפליקציה עושה שימוש בטכנולוגיות מתקדמות כגון React, TypeScript, Bootstrap, Axios, Formik, וכוללת התממשקות מלאה ל-API.
          הפרויקט מהווה יישום מעשי של כל החומר הנלמד במודול 3 בקורס, בדגש על בניית אפליקציה צד לקוח מודרנית, מאובטחת ורספונסיבית.
        </p>
      </Card>
    </Container>
  );
};

export default AboutPage;
