import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    phone: '',
    image: '',
    address: {
      state: '',
      country: '',
      city: '',
      street: '',
      houseNumber: 0,
      zip: 0,
    },
    isBusiness: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .test('full-name', 'יש להזין שם פרטי ושם משפחה', (value) => {
        if (!value) return false;
        const parts = value.trim().split(' ');
        return parts.length >= 2 && parts[0] !== '' && parts[1] !== '';
      })
      .required('שדה חובה'),
    email: Yup.string().email('אימייל לא תקין').required('שדה חובה'),
    password: Yup.string()
      .min(8, 'סיסמה חייבת להיות לפחות 8 תווים')
      .matches(/[A-Z]/, 'חייבת לכלול אות גדולה באנגלית')
      .matches(/[a-z]/, 'חייבת לכלול אות קטנה באנגלית')
      .matches(/[0-9]/, 'חייבת לכלול מספר')
      .matches(/[!@#$%^&*]/, 'חייבת לכלול תו מיוחד (!@#$%^&*)')
      .required('שדה חובה'),
    phone: Yup.string().required('שדה חובה'),
    image: Yup.string().url('קישור לא תקין'),
    address: Yup.object({
      state: Yup.string().required('שדה חובה'),
      country: Yup.string().required('שדה חובה'),
      city: Yup.string().required('שדה חובה'),
      street: Yup.string().required('שדה חובה'),
      houseNumber: Yup.number().required('שדה חובה'),
      zip: Yup.number().required('שדה חובה'),
    }),
    isBusiness: Yup.boolean(),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const nameParts = values.name.trim().split(' ');
      const payload = {
        name: {
          first: nameParts[0],
          last: nameParts[1] || '',
        },
        email: values.email,
        password: values.password,
        image: {
          url: values.image,
          alt: values.name,
        },
        phone: values.phone,
        address: { ...values.address },
        isBusiness: Boolean(values.isBusiness),
      };
      await register(payload);
      toast.success('נרשמת בהצלחה!');
      navigate('/login');
    } catch (err) {
      const error = err as any;
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('אירעה שגיאה בהרשמה');
      }
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">הרשמה</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ touched, errors }) => (
          <Form noValidate>
            <div className="mb-3">
              <label htmlFor="name">שם מלא</label>
              <Field name="name" type="text" className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`} />
              <ErrorMessage name="name" component="div" className="invalid-feedback small" />
            </div>

            <div className="mb-3">
              <label htmlFor="email">אימייל</label>
              <Field name="email" type="email" className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`} />
              <ErrorMessage name="email" component="div" className="invalid-feedback small" />
            </div>

            <div className="mb-3">
              <label htmlFor="password">סיסמה</label>
              <Field name="password" type="password" className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`} />
              <ErrorMessage name="password" component="div" className="invalid-feedback small" />
            </div>

            <div className="mb-3">
              <label htmlFor="phone">טלפון</label>
              <Field name="phone" type="text" className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`} />
              <ErrorMessage name="phone" component="div" className="invalid-feedback small" />
            </div>

            <div className="mb-3">
              <label htmlFor="image">תמונה (קישור)</label>
              <Field name="image" type="text" className={`form-control ${touched.image && errors.image ? 'is-invalid' : ''}`} />
              <ErrorMessage name="image" component="div" className="invalid-feedback small" />
            </div>

            <h5 className="mt-4">כתובת</h5>

            <div className="mb-3">
              <label>מדינה</label>
              <Field name="address.country" type="text" className={`form-control ${touched.address?.country && errors.address?.country ? 'is-invalid' : ''}`} />
              <ErrorMessage name="address.country" component="div" className="invalid-feedback small" />
            </div>

            <div className="mb-3">
              <label>עיר</label>
              <Field name="address.city" type="text" className={`form-control ${touched.address?.city && errors.address?.city ? 'is-invalid' : ''}`} />
              <ErrorMessage name="address.city" component="div" className="invalid-feedback small" />
            </div>

            <div className="mb-3">
              <label>רחוב</label>
              <Field name="address.street" type="text" className={`form-control ${touched.address?.street && errors.address?.street ? 'is-invalid' : ''}`} />
              <ErrorMessage name="address.street" component="div" className="invalid-feedback small" />
            </div>

            <div className="mb-3">
              <label>מספר בית</label>
              <Field name="address.houseNumber" type="number" className={`form-control ${touched.address?.houseNumber && errors.address?.houseNumber ? 'is-invalid' : ''}`} />
              <ErrorMessage name="address.houseNumber" component="div" className="invalid-feedback small" />
            </div>

            <div className="mb-3">
              <label>מיקוד</label>
              <Field name="address.zip" type="number" className={`form-control ${touched.address?.zip && errors.address?.zip ? 'is-invalid' : ''}`} />
              <ErrorMessage name="address.zip" component="div" className="invalid-feedback small" />
            </div>

            <div className="mb-3">
              <label>מחוז</label>
              <Field name="address.state" type="text" className={`form-control ${touched.address?.state && errors.address?.state ? 'is-invalid' : ''}`} />
              <ErrorMessage name="address.state" component="div" className="invalid-feedback small" />
            </div>

            <div className="form-check mb-3">
              <Field type="checkbox" name="isBusiness" className="form-check-input" id="isBusiness" />
              <label className="form-check-label" htmlFor="isBusiness">משתמש עסקי</label>
            </div>

            <Button type="submit" variant="primary" className="w-100">הרשמה</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterPage;