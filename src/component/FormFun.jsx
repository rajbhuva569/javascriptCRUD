import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';


export default function FormFun() {
  const [show, setShow] = useState(false);
  const [person, setPerson] = useState({});
  const [personData, setPersonData] = useState([]);
  const [errors, setErrors] = useState({});
  const handleClose = () => { setShow(false); setPerson(''); setErrors('') };
  const handleShow = () => setShow(true);

  const handleinput = (event) => {
    // console.log(event.target.name, event.target.value, "dname");

    if (event.target.type === 'checkbox') {

      let hobby = person?.hobby?.length ? JSON.parse(JSON.stringify(person.hobby)) : [];
      if (event.target.checked) {
        hobby.push(event.target.value);
        setPerson({ ...person, [event.target.name]: hobby });
        validation(event.target.name, hobby?.length)

      } else {

        setPerson({ ...person, [event.target.name]: hobby.filter(item => item !== event.target.value) });
        validation(event.target.name, hobby.filter(item => item !== event.target.value)?.length)
      }
    } else {

      setPerson(prevstate => ({
        ...prevstate,
        [event.target.name]: event.target.value
      }));
      validation(event.target.name, event.target.value)
    }
    console.log(person);
  }
  const validation = (name, value) => {
    setErrors(prevstate => ({ ...prevstate, [name]: !!!value }))
  }
  const checkValidation = () => {


    let validationObj = {
      firstname: !!!person.firstname,
      lastname: !!!person.lastname,
      email: !!!person.email,
      password: !!!person.password,
      gender: !!!person.gender,
      hobby: !!!person.hobby?.length,
      state: !!!person.state,
      file: !!!person.image,
    }

    setErrors(validationObj)
    // return false
    return !validationObj.firstname && !validationObj.lastname && !validationObj.email && !validationObj.password && !validationObj.gender && !validationObj.hobby && !validationObj.state && !validationObj.file

  };


  useEffect(() => {
    console.log('pagemount');
    if (localStorage.getItem("data")?.length) {
      console.log(localStorage.getItem("data"));
      setPersonData(JSON.parse(localStorage.getItem("data")) ?? [])

    }
    return () => {
      console.log("unmount");
    }
  }, [])
  // useEffect(() => {
  //   if (Object.keys(person)?.length) {
  //     validation()
  //   }
  // }, [person])

  const handleSubmit = () => {
    let data
    if (checkValidation()) {
      // if (validation()) {
      if (person.id) {
        data = personData.map((item) =>
          item.id === person.id ? { ...item, ...person } : item
        )
      } else {
        data = [...personData, { ...person, id: Date.now() }];

      }
      setPersonData(data);
      console.log(data);
      console.log(person);
      localstorageData(data);
      setPerson({})
      handleClose()
    }
  }
  const updatedata = (user) => {
    console.log("update data");
    console.log(user);
    setPerson(user);
    handleShow()
  }
  const localstorageData = (data) => {
    localStorage.setItem("data", JSON.stringify(data));

  }
  const deleteData = (index) => {
    console.log("delete data");
    if (window.confirm("are you sure this data deleted")) {
      const deletedata = [...personData]
      deletedata.splice(index, 1)
      setPersonData(deletedata)
      localstorageData(deletedata);
    }
  }
  const encodeImageFileAsURL = (event) => {
    if (event.target.name === 'image') {
      let imageData = event.target.files;
      var file = imageData[0];
      var reader = new FileReader();
      reader.onloadend = () => {
        console.log('RESULT', reader.result);
        setPerson({

          ...person,
          image: reader.result,

        });
        validation("image", reader.result)
      };
      reader.readAsDataURL(file);
    }
  };

  // console.log(setPerson);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add data
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {person.id ? 'Edit' : 'Add'} USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridfname">
                <Form.Label>first name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" name='firstname' onChange={handleinput} value={person.firstname} />
                {errors.firstname && <span style={{ color: "red" }}>Enter a first name</span>}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridlname">
                <Form.Label>last name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" name='lastname' onChange={handleinput} value={person.lastname} />
                {errors.lastname && <span style={{ color: "red" }}>Enter a last name</span>}

              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleinput} value={person.email} />
                {errors.email && <span style={{ color: "red" }}>Enter a email</span>}

              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={handleinput} value={person.password} />
                {errors.password && <span style={{ color: "red" }}>Enter a password</span>}

              </Form.Group>
            </Row>
            <Row className="mb-3">


              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose..." name='state' onChange={handleinput} value={person.state}>
                  <option defaultChecked value={''}>Choose...</option>
                  <option value={'surat'}>surat</option>
                  <option value={'rajkot'}>rajkot</option>
                  <option value={'Amerli'}>Amerli</option>
                </Form.Select>
                {errors.state && <span style={{ color: "red" }}>select a state</span>}

              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="formGridZip">
                <Form.Label>Hobby</Form.Label>
                <Form.Check

                  label="cricket"
                  name="hobby"
                  value={'cricket'}
                  type={'checkbox'}
                  id={`cricket`}
                  onChange={handleinput}
                  checked={person.hobby?.includes("cricket")}
                />
                <Form.Check

                  label="bgmi1"
                  name="hobby"
                  value={'bgmi'}
                  type={'checkbox'}
                  id={`bgmi`}
                  onChange={handleinput}
                  checked={person.hobby?.includes("bgmi")}
                />
                <Form.Check

                  label="vollyball"
                  name="hobby"
                  value={'vollyball'}
                  type={'checkbox'}
                  id={`vollyball`}
                  onChange={handleinput}
                  checked={person.hobby?.includes("vollyball")}
                />
                {errors.hobby && <span style={{ color: "red" }}>select a hobby</span>}

              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Check
                  type="radio"
                  label="male"
                  name='gender'
                  value="male"
                  id="male"
                  onChange={handleinput}
                  checked={person.gender === "male"}
                />
                <Form.Check
                  type="radio"
                  label="fe-male"
                  name='gender'
                  value="female"
                  id="female"
                  onChange={handleinput}
                  checked={person.gender === "female"}

                />
                <Form.Check
                  type="radio"
                  label="other"
                  name='gender'
                  value="other"
                  id="other"
                  onChange={handleinput}
                  checked={person.gender === "other"}

                />
                {errors.gender && <span style={{ color: "red" }}>select a gender</span>}

              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>profile</Form.Label>
                <Form.Control type="file" onChange={encodeImageFileAsURL} name="image" />

              </Form.Group>
              <Col xs={6} md={4}>
                <Image src={person.image} height={'100px'} width={'100px'} roundedCircle />
              </Col>
              {errors.file && <span style={{ color: "red" }}>select a profile</span>}

            </Row>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>profile</th>
            <th>First Name</th>
            <th>last name</th>
            <th>email</th>
            <th>password</th>
            <th>gender</th>
            <th>state</th>
            <th>hobby</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {personData.map((user, index) => {
            return <tr key={user.id}>
              <td>{user.id}</td>
              <td><Image src={user.image} height={'100px'} width={'100px'} roundedCircle></Image></td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.gender}</td>
              <td>{user.state}</td>
              <td>{user.hobby?.join(",")}</td>
              <td>
                <Button variant="primary" onClick={() => { updatedata(user) }} >update</Button>
                <Button variant="danger" onClick={() => { deleteData(index) }}>delete</Button>
              </td>
            </tr>
          })
          }
        </tbody>
      </Table>

    </>
  )
}
