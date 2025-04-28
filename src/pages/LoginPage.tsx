import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { login } from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('אימייל לא תקין').required('שדה חובה'),
    password: Yup.string().required('שדה חובה'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const res = await login(values);
     

      if (res.data) {
        const token = res.data;
       

        localStorage.setItem("token", token); 

        const decodedUser = JSON.parse(atob(token.split('.')[1]));
        

        setUser({
          _id: decodedUser._id,
          isBusiness: decodedUser.isBusiness,
          isAdmin: decodedUser.isAdmin,
        });

        toast.success('התחברת בהצלחה!');
        navigate('/my-cards');
      } else {
        toast.error('שגיאה בהתחברות.');
      }
    } catch (err: any) {
      console.error("🔴 שגיאה בהתחברות:", err);
      if (err.response) {
        console.error("🔴 תגובת שגיאה מהשרת:", err.response.data);
        if (err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('שגיאת התחברות: ' + JSON.stringify(err.response.data));
        }
      } else {
        toast.error('אירעה שגיאה בהתחברות');
      }
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">התחברות</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ touched, errors }) => (
          <Form noValidate>
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

            <Button type="submit" variant="primary" className="w-100">התחברות</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginPage;
