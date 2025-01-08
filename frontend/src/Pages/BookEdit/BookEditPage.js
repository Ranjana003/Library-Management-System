import { useParams } from 'react-router-dom';
import classes from './bookEdit.module.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { add, getById, update } from '../../services/bookServices';
import Title from '../../Components/Title/Title';
import InputContainer from '../../Components/InputContainer/InputContainer';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { uploadImage } from '../../services/uploadService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function BookEditPage() {
  const { bookId } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const isEditMode = !!bookId;

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isEditMode) return;

    getById(bookId).then(book => {
      if (!book) return;
      reset(book);
      setImageUrl(book.imageUrl);
    });
  }, [bookId]);

  const submit = async bookData => {
    const book = { ...bookData, imageUrl };

    if (isEditMode) {
      await update(book);
      toast.success(`book "${book.name}" updated successfully!`);
      return;
    }

    const newbook = await add(book);
    toast.success(`book "${book.name}" added successfully!`);
    navigate('/admin/editbook/' + newbook.id, { replace: true });
  };

  const upload = async event => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? 'Edit book' : 'Add book'} />
        <form
          className={classes.form}
          onSubmit={handleSubmit(submit)}
          noValidate
        >
          <InputContainer label="Select Image">
            <input type="file" onChange={upload} accept="image/jpeg" />
          </InputContainer>

          {imageUrl && (
            <a href={imageUrl} className={classes.image_link} target="blank">
              <img src={imageUrl} alt="Uploaded" />
            </a>
          )}

          <Input
            type="text"
            label="Name"
            {...register('name', { required: true, minLength: 5 })}
            error={errors.name}
          />
          <Input
            type="text"
            label="Author"
            {...register('author', { required: true, minLength: 5 })}
            error={errors.name}
          />

          <Input
            type="number"
            label="Publication Year"
            {...register('publicationYear', { required: true })}
            error={errors.publicationYear}
          />
          <Input
            type="number"
            label="ISBN"
            {...register('isbn', { required: true })}
            error={errors.isbn}
          />


          <Input
            type="text"
            label="Genre"
            {...register('genre', { required: true })}
            error={errors.genre}
          />

         

          <Button type="submit" text={isEditMode ? 'Update' : 'Create'} />
        </form>
      </div>
    </div>
  );
}