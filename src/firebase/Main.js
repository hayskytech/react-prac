import React, { useEffect, useState } from 'react'
import OTPLogin from '../OTPLogin'
import { getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";
import { Button, Container, Modal, Label, Input, List, Icon } from 'semantic-ui-react';

export default function Main() {
  const [user, setUser] = useState(null)
  const [list, setlist] = useState([])
  const [item, setitem] = useState('')
  const [dbox, setdbox] = useState(false)
  const db = getDatabase();

  function additem() {
    if (item === '') return
    const postListRef = ref(db, 'todos/' + user.uid);
    const newPostRef = push(postListRef);
    set(newPostRef, item);
    setitem('')
  }

  useEffect(() => {
    if (user) {
      const starCountRef = ref(db, 'todos/' + user.uid);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setlist(data)
        } else {
          setlist([])
        }
      });
    }
  }, [user])

  function deleteall() {
    const starCountRef = ref(db, 'todos/' + user.uid);
    remove(starCountRef)
    setdbox(false)
  }
  function deletethis(key) {
    const starCountRef = ref(db, 'todos/' + user.uid + '/' + key);
    remove(starCountRef)
  }
  return (
    <div>
      <Container>
        <OTPLogin user={user} setUser={setUser} />

        <hr />
        <Button color='red' onClick={() => { setdbox(true) }}>Delete All</Button>
        <hr />

        <Input placeholder="write something..." labelPosition='right' type='text' value={item} onChange={(e) => { setitem(e.target.value) }}>
          <Label color='grey'>Item</Label>
          <input />
          <Label icon color='green' onClick={additem}><Icon name='plus' /></Label>
        </Input>

        <Modal
          closeIcon
          basic
          size='small'
          open={dbox}
          closeOnDimmerClick={true}
          onOpen={() => { setdbox(true) }}
          onClose={() => { setdbox(false) }}
        >
          <Modal.Header>
            <h3>Confirm Delete All?</h3>
            <Button color='grey' onClick={() => { setdbox(false) }}>No</Button>
            <Button color='red' onClick={deleteall}>Yes</Button>

          </Modal.Header>
          {/* <Modal.Actions> */}
          {/* </Modal.Actions> */}
        </Modal>


        <h2>Todo List</h2>
        <List divided verticalAlign='middle'>
          {
            Object.entries(list).map((item) => {
              return (
                <List.Item key={item[0]}>
                  <List.Content floated='right'>
                    <Button icon color='red' onClick={() => { deletethis(item[0]) }}>
                      <Icon name='trash' />
                    </Button>
                  </List.Content>
                  <List.Header>{item[1]}</List.Header>
                </List.Item>
              )
            })
          }
        </List>
      </Container>
    </div>
  )
}
