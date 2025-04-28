import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { createCard } from "../services/apiService";
import { FaSave } from "react-icons/fa";

const CreateCardPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      image: {
        url: "",
        alt: "",
      },
      address: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("שדה חובה"),
      subtitle: Yup.string().required("שדה חובה"),
      description: Yup.string().required("שדה חובה"),
      phone: Yup.string().required("שדה חובה"),
      email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
      web: Yup.string().url("כתובת אתר לא תקינה").nullable(),
      image: Yup.object({
        url: Yup.string().url("כתובת תמונה לא תקינה").nullable(),
        alt: Yup.string().nullable(),
      }),
      address: Yup.string().required("שדה חובה"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("🟢 נשלח:", values);
        const flatValues = {
          title: values.title,
          subtitle: values.subtitle,
          description: values.description,
          phone: values.phone,
          email: values.email,
          web: values.web,
          address: values.address,
          imageUrl: values.image.url,
          imageAlt: values.image.alt,
        };
        await createCard(flatValues);
        toast.success("כרטיס נוצר בהצלחה!");
        navigate("/my-cards");
      } catch (err: any) {
        console.error("🔴 שגיאה ביצירת כרטיס:", err);
        toast.error(err.response?.data?.message || "שגיאה ביצירת כרטיס");
      }
    },
  });

  return (
    <Container className="py-5">
      <Card className="p-4 shadow-sm">
        <h2 className="text-center mb-4">צור כרטיס חדש</h2>
        <Form onSubmit={formik.handleSubmit}>
          {[
            { name: "title", label: "כותרת" },
            { name: "subtitle", label: "תת כותרת" },
            { name: "description", label: "תיאור", as: "textarea", rows: 3 },
            { name: "phone", label: "טלפון", type: "tel" },
            { name: "email", label: "אימייל", type: "email" },
            { name: "web", label: "אתר אינטרנט", type: "url" },
            { name: "image.url", label: "כתובת תמונה", type: "url" },
            { name: "image.alt", label: "תיאור תמונה" },
            { name: "address", label: "כתובת" },
          ].map(({ name, label, type, as, rows }) => {
            const fieldProps = formik.getFieldProps(name);
            const [base, sub] = name.split(".");
            const error = sub ? (formik.errors as any)?.[base]?.[sub] : (formik.errors as any)?.[name];
            const touched = sub ? (formik.touched as any)?.[base]?.[sub] : (formik.touched as any)?.[name];

            return (
              <Form.Group className="mb-3" key={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  {...fieldProps}
                  type={type as any}
                  as={as as any}
                  rows={rows}
                  isInvalid={!!touched && !!error}
                />
                <Form.Control.Feedback type="invalid">
                  {error as string}
                </Form.Control.Feedback>
              </Form.Group>
            );
          })}
          <Button variant="primary" type="submit" className="w-100 d-flex align-items-center justify-content-center gap-2">
            <FaSave /> יצירת כרטיס
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateCardPage;
