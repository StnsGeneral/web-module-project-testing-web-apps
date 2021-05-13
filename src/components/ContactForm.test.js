import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
  render(<ContactForm />);
});

test('renders the contact form header', () => {
  render(<ContactForm />);
  const header = screen.getByText('Contact Form');
  expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText('First Name*');
  userEvent.type(firstNameInput, 'Bill');
  const error = screen.getByTestId('error');
  expect(error).toHaveTextContent(
    'Error: firstName must have at least 5 characters.'
  );
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />);
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);
  const error = screen.getAllByTestId('error');
  expect(error[0]).toHaveTextContent(
    'Error: firstName must have at least 5 characters.'
  );
  expect(error[1]).toHaveTextContent('Error: lastName is a required field.');
  expect(error[2]).toHaveTextContent(
    'Error: email must be a valid email address.'
  );
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText('First Name*');
  const lastNameInput = screen.getByLabelText('Last Name*');
  const submitButton = screen.getByRole('button');
  userEvent.type(firstNameInput, 'Jimmy');
  userEvent.type(lastNameInput, 'Carr');
  userEvent.click(submitButton);
  const error = screen.getByTestId('error');
  expect(error).toHaveTextContent(
    'Error: email must be a valid email address.'
  );
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailInput = screen.getByLabelText('Email*');
  userEvent.type(emailInput, 'jimmy');
  const error = screen.getByTestId('error');
  expect(error).toHaveTextContent(
    'Error: email must be a valid email address.'
  );
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText('First Name*');
  userEvent.type(firstNameInput, 'Jimmy');
  const emailInput = screen.getByLabelText('Email*');
  userEvent.type(emailInput, 'jimmy@carr.com');
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);
  const error = screen.getByTestId('error');
  expect(error).toHaveTextContent('Error: lastName is a required field.');
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText('First Name*');
  userEvent.type(firstNameInput, 'Jimmy');
  const lastNameInput = screen.getByLabelText('Last Name*');
  userEvent.type(lastNameInput, 'Carr');
  const emailInput = screen.getByLabelText('Email*');
  userEvent.type(emailInput, 'jimmy@carr.com');
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);
  const firstName = screen.getByTestId('firstnameDisplay');
  const lastName = screen.getByTestId('lastnameDisplay');
  const email = screen.getByTestId('emailDisplay');
  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText('First Name*');
  userEvent.type(firstNameInput, 'Jimmy');
  const lastNameInput = screen.getByLabelText('Last Name*');
  userEvent.type(lastNameInput, 'Carr');
  const emailInput = screen.getByLabelText('Email*');
  userEvent.type(emailInput, 'jimmy@carr.com');
  const messageInput = screen.getByLabelText('Message');
  userEvent.type(messageInput, 'Jimmy Carr is a comedian.');
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);
  const firstName = screen.getByTestId('firstnameDisplay');
  const lastName = screen.getByTestId('lastnameDisplay');
  const email = screen.getByTestId('emailDisplay');
  const message = screen.getByTestId('messageDisplay');
  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(message).toBeInTheDocument();
});
