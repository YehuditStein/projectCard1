import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Spinner, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { getCardById, updateCard } from "../services/apiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaSave } from "react-icons/fa";

interface CardFormData {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  imageUrl: string;
  imageAlt: string;
  address: string;
}

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<CardFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCardById(id!)
      .then((res) => {
        const data = res.data;
        setInitialValues({
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          phone: data.phone,
          email: data.email,
          web: data.web,
          imageUrl: data.image?.url || "",
          imageAlt: data.image?.alt || "",
          address: `${data.address.street} ${data.address.houseNumber}, ${data.address.city}`,
        });
      })
      .catch(() => setError("שגיאה בטעינת פרטי הכרטיס"))
      .finally(() => setLoading(false));
  }, [id]);

  const formik = useFormik<CardFormData>({
    initialValues: initialValues || {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      imageUrl: "",
      imageAlt: "",
      address: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("שדה חובה"),
      subtitle: Yup.string().required("שדה חובה"),
      description: Yup.string().required("שדה חובה"),
      phone: Yup.string().required("שדה חובה"),
      email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
      web: Yup.string().url("כתובת אתר לא תקינה").nullable(),
      imageUrl: Yup.string().url("קישור תמונה לא תקין").nullable(),
      imageAlt: Yup.string().nullable(),
      address: Yup.string().required("שדה חובה"),
    }),
    onSubmit: async (values) => {
      try {
        await updateCard(id!, {
          title: values.title,
          subtitle: values.subtitle,
          description: values.description,
          phone: values.phone,
          email: values.email,
          web: values.web,
          address: values.address,
          image: { url: values.imageUrl, alt: values.imageAlt },
        });
        toast.success("כרטיס עודכן בהצלחה!");
        navigate("/my-cards");
      } catch (err: any) {
        console.error("שגיאה בעדכון כרטיס:", err);
        toast.error(err.response?.data?.message || "שגיאה בעדכון הכרטיס");
      }
    },
  });

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-sm">
        <h2 className="text-center mb-4">ערוך כרטיס</h2>
        <Form onSubmit={formik.handleSubmit}>
          {["title", "subtitle", "description", "phone", "email", "web", "imageUrl", "imageAlt", "address"].map((field) => (
            <Form.Group className="mb-3" key={field}>
              <Form.Label>{formik.getFieldProps(field).name}</Form.Label>
              <Form.Control
                {...formik.getFieldProps(field as keyof CardFormData)}
                type={field === "email" ? "email" : field === "web" || field === "imageUrl" ? "url" : "text"}
                as={field === "description" ? "textarea" : undefined}
                rows={field === "description" ? 3 : undefined}
                isInvalid={!!formik.touched?.[field as keyof CardFormData] && !!formik.errors?.[field as keyof CardFormData]}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors?.[field as keyof CardFormData] as string}
              </Form.Control.Feedback>
            </Form.Group>
          ))}

          <Button variant="primary" type="submit" className="w-100">
            <FaSave className="ms-2" /> שמור שינויים
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default EditCardPage;