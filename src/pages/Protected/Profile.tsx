import './styles/Profile.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useEffect, useState } from 'react';
import { ProtectedContext } from '../../useContext/ProtectedContext';
import { Dropdown, ProgressBar } from 'react-bootstrap';
import axios from 'axios'
import { AlertContext } from '../../useContext/AlertContext';
import { v4 as uuidv4 } from 'uuid';
import { Spinner } from 'react-bootstrap'
import { url } from '../../utils/url';
const Profile = () => {
  const { setActive, user, setUser } = useContext<{ setActive: any, user: any, setUser: any }>(ProtectedContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [petsDropdown, setPetsDropdown] = useState<boolean>(false)
  const [creditDropdown, setCreditDropdown] = useState<boolean>(false)
  const [smokingDropdown, setSmokingDropdown] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)
  const { setAlertList, inProcess, setInProcess } = useContext<{ setAlertList: any, inProcess: boolean, setInProcess: any }>(AlertContext)
  const [profile, setProfile] = useState<any>(user)
  const handleEditProfile = async () => {
    setInProcess(true)
    if (!profile.age) {
      setAlertList({ id: uuidv4(), msg: 'Enter age', type: "danger" })
      setInProcess(false)
    } else if (!profile.occupation) {
      setAlertList({ id: uuidv4(), msg: 'Enter occupation', type: "danger" })
      setInProcess(false)
    } else if (!profile.monthly_income) {
      setAlertList({ id: uuidv4(), msg: 'Enter monthly income', type: "danger" })
      setInProcess(false)
    } else {
      try {
        const res = await axios.patch('https://ca4b-2003-e9-ff26-de9-f9e3-5a2d-eef5-b7bd.ngrok-free.app/api/v1/user', { user: profile }, {
          headers: {
            access_token: localStorage.getItem('flatbot_access-token'),
            client: localStorage.getItem('flatbot_client'),
            uid: localStorage.getItem('flatbot_uid')
          }
        })
        if (res.status === 200) {
          setInProcess(false)
          setAlertList({ id: uuidv4(), msg: 'Profile edited', type: "success" })
          setActive(1)
        }
      } catch (error: any) {
        console.log(error)
        if (typeof error.response.data.alert === "object") {
          error.response.data.alert.map((item: string): void => {
            setAlertList({ id: uuidv4(), msg: item, type: 'danger' })
          })
        } else {
          setAlertList({ id: uuidv4(), msg: error.response.data.alert, type: 'danger' })
        }
        setInProcess(false)
      }
    }
  }
  const edit_profile_1 = async (e: any) => {
    e.preventDefault()
    setInProcess(true)
    let formdata = {
      full_name: profile.full_name,
      occupation: profile.occupation,
      monthly_income: profile.monthly_income,
      age: profile.age,
      any_pets: profile.any_pets

    }
    try {
      const res = await axios.post(`${url}/user/edit_profile_1`, formdata, {
        headers: {
          token: localStorage.getItem('flatbot')
        }
      })
      if (res.data.success) {
        setUser(res.data.data)
        setStep(2)
        setInProcess(false)
      }
    } catch (error: any) {
      setAlertList({ id: uuidv4(), msg: error.response.data.message, type: 'danger' })
      setInProcess(false)
    }
  }

  const edit_profile_2 = async (e: any) => {
    e.preventDefault()
    setInProcess(true)
    let formdata = {
      previous_rental_history_and_reference: profile.previous_rental_history_and_reference,
      hobbies_and_interests: profile.hobbies_and_interests,
      credit_score: profile.credit_score,
      smoking_status: profile.smoking_status,
    }
    try {
      const res = await axios.post(`${url}/user/edit_profile_2`, formdata, {
        headers: {
          token: localStorage.getItem('flatbot')
        }
      })
      if (res.data.success) {
        setUser(res.data.data)
        setStep(3)
        setInProcess(false)
      }
    } catch (error: any) {
      setAlertList({ id: uuidv4(), msg: error.response.data.message, type: 'danger' })
      setInProcess(false)
    }
  }

  const edit_profile_3 = async (e: any) => {
    e.preventDefault()
    setInProcess(true)
    let formdata = {
      rental_duration: profile.rental_duration,
      number_of_people_to_be_shared_with: profile.number_of_people_to_be_shared_with,
      cleaning_habits: profile.cleaning_habits,
      prefered_quiet_hours: profile.prefered_quiet_hours,
      working_hours: profile.working_hours,
    }
    try {
      const res = await axios.post(`${url}/user/edit_profile_3`, formdata, {
        headers: {
          token: localStorage.getItem('flatbot')
        }
      })
      if (res.data.success) {
        setAlertList({ id: uuidv4(), msg: res.data.message, type: 'success' })
        setInProcess(false)
        setUser(res.data.data)
        setActive(1)
      }
    } catch (error: any) {
      setAlertList({ id: uuidv4(), msg: error.response.data.message, type: 'danger' })
      setInProcess(false)
    }
  }

  useEffect(() => {
    setProfile(user)
  }, [user])
  return (
    <>
      {loading && !profile &&
        <ProgressBar animated now={100} />
      }
      {!loading && profile && <>
        {/* <h2 className="heading">Profile</h2> */}
        <div className='heading'>
          <h5 className='main_heading'>The more you fill your profile, the more personalised the message</h5>
          <p className='caption'>We don’t use your data for anything else apart from generating the message. </p>
        </div>
        <div className='steps'>
          <div className='step1'>
            <div >
              <span className='circle circle_active' onClick={() => setStep(1)}>1</span>
              <span className='bottom_text active' >Basic Information</span>
            </div>
          </div>
          <hr className={step === 2 ? 'hr hr-active' : 'hr'} />
          <div className='step2'>
            <div>
              <span className={step === 2 || step === 3 ? 'circle circle_active' : 'circle'} onClick={() => setStep(2)}>2</span>
              <span className={step === 2 || step === 3 ? 'bottom_text active' : 'bottom_text'}>More Information</span>
            </div>
          </div>
          <hr className={step === 3 ? 'hr hr-active' : 'hr'} />
          <div className='step3'>
            <div >
              <span className={step === 3 ? 'circle circle_active' : 'circle'} onClick={() => setStep(3)}>3</span>
              <span className={step === 3 ? 'bottom_text active' : 'bottom_text'}>More Information</span>
            </div>
          </div>
        </div>
        {step === 1 &&
          <Form>
            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>Full Name*</Form.Label>
              <Form.Control type="text" placeholder="Andrew Tate" required value={profile.full_name} onChange={e => setProfile({ ...profile, full_name: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>Occupation*</Form.Label>
              <Form.Control type="text" placeholder="Occupation" value={profile.occupation} onChange={e => setProfile({ ...profile, occupation: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>Monthly Income</Form.Label>
              <Form.Control type="number" min={0} placeholder="Monthly income" value={profile.monthly_income} onChange={e => setProfile({ ...profile, monthly_income: parseInt(e.target.value) })} />
            </Form.Group>

            <div className='age_pets'>
              <Form.Group className="mb-3 input_field flexed" controlId="formBasicEmail">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" min={0} placeholder="Age" value={profile.age} onChange={e => setProfile({ ...profile, age: parseInt(e.target.value) })} />
              </Form.Group>
              <Form.Group className="mb-3 input_field flexed" controlId="formBasicEmail">
                <Form.Label>Have Pets?</Form.Label>
                <div className='dropdown' onClick={() => setPetsDropdown(prev => !prev)}>
                  <p>{profile.any_pets ? profile.any_pets : 'None'}</p>
                  <img src='img/trigger.png' className='trigger' />
                  {petsDropdown &&
                    <div className='multi-select'>
                      <p onClick={() => { !profile.any_pets.includes('Cat') && setProfile({ ...profile, any_pets: profile.any_pets ? profile.any_pets + ', Cat' : 'Cat' }) }}>Cat</p>
                      <p onClick={() => { !profile.any_pets.includes('Dog') && setProfile({ ...profile, any_pets: profile.any_pets ? profile.any_pets + ', Dog' : 'Dog' }) }}>Dog</p>
                      <p onClick={() => { !profile.any_pets.includes('Bird') && setProfile({ ...profile, any_pets: profile.any_pets ? profile.any_pets + ', Bird' : 'Bird' }) }}>Bird</p>
                      <p onClick={() => { !profile.any_pets.includes('Reptile') && setProfile({ ...profile, any_pets: profile.any_pets ? profile.any_pets + ', Reptile' : 'Reptile' }) }}>Reptile</p>
                    </div>
                  }
                </div>
              </Form.Group>
            </div>
            <button className="submit" onClick={(e) => edit_profile_1(e)} disabled={inProcess || !profile.full_name || !profile.occupation}>
              {inProcess ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : (!profile.full_name || !profile.occupation) ? <span className='button_inner_text disabled'>Continue <img src='img/go-disabled.png' /></span> : <span className='button_inner_text'>Continue <img src='img/go.png' /></span>}
            </button>
          </Form>

        }

        {step === 2 &&
          <Form>
            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>Any experience / references in renting an apartment or living in a shared flat?</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Elaborate a bit on your experience" className='multiple-rows' required value={profile.previous_rental_history_and_reference} onChange={e => setProfile({ ...profile, previous_rental_history_and_reference: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>Your Interests & Hobbies</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Share something interesting about you" className='multiple-rows' value={profile.hobbies_and_interests} onChange={e => setProfile({ ...profile, hobbies_and_interests: e.target.value })} />
            </Form.Group>

            <div className='age_pets'>
              <Form.Group className="mb-3 input_field flexed" controlId="formBasicEmail">
                <Form.Label className='upperlabel'>Credit Score </Form.Label>
                <Form.Label>(Schufa-Check) available?</Form.Label>
                <div className='dropdown' onClick={() => setCreditDropdown(prev => !prev)}>
                  <p>{profile.credit_score}</p>

                  <img src='img/trigger.png' className='trigger' />
                  {creditDropdown &&
                    <div className='multi-select'>
                      <p onClick={() => { setProfile({ ...profile, credit_score: 'No' }) }}>No</p>
                      <p onClick={() => { setProfile({ ...profile, credit_score: 'Yes' }) }}>Yes</p>
                    </div>
                  }
                </div>
              </Form.Group>
              <Form.Group className="mb-3 input_field flexed" controlId="formBasicEmail">
                <Form.Label className='upperlabel'>{' '}</Form.Label>
                <Form.Label>Smoking?</Form.Label>
                <div className='dropdown' onClick={() => setSmokingDropdown(prev => !prev)}>
                  <p>{profile.smoking_status}</p>

                  <img src='img/trigger.png' className='trigger' />
                  {smokingDropdown &&
                    <div className='multi-select'>
                      <p onClick={() => { setProfile({ ...profile, smoking_status: 'No' }) }}>No</p>
                      <p onClick={() => { setProfile({ ...profile, smoking_status: 'Yes' }) }}>Yes</p>
                    </div>
                  }
                </div>
              </Form.Group>
            </div>
            <button className="submit" onClick={(e) => edit_profile_2(e)} disabled={inProcess}>
              {inProcess ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <span className='button_inner_text'>Continue<img src='img/go.png' /></span>}
            </button>
          </Form>

        }

        {step === 3 &&
          <Form>
            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>For how long are intending to rent?</Form.Label>
              <Form.Control type='text' placeholder="Rental duration" required value={profile.rental_duration} onChange={e => setProfile({ ...profile, rental_duration: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>Are you planning to make a WG? If yes, how many people do you want to share the apartment with?</Form.Label>
              <Form.Control type='number' min="0" placeholder="More info on your WG" value={profile.number_of_people_to_be_shared_with} onChange={e => setProfile({ ...profile, number_of_people_to_be_shared_with: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>How would you describe your cleaning habits?</Form.Label>
              <Form.Control type='text' placeholder="Cleaning habits" value={profile.cleaning_habits} onChange={e => setProfile({ ...profile, cleaning_habits: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>When are your preferred quiet hours?</Form.Label>
              <Form.Control type='text' placeholder="Quiet hours" value={profile.prefered_quiet_hours} onChange={e => setProfile({ ...profile, prefered_quiet_hours: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>What are your working hours?</Form.Label>
              <Form.Control type='text' placeholder="Working hours" value={profile.working_hours} onChange={e => setProfile({ ...profile, working_hours: e.target.value })} />
            </Form.Group>
            <button className="submit" onClick={(e) => edit_profile_3(e)} disabled={inProcess}>
              {inProcess ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <span className='button_inner_text'>Save & Close</span>}
            </button>
          </Form>

        }
        {/* <Form>
          <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
            <Form.Label>Full Name*</Form.Label>
            <Form.Control type="text" placeholder="Andrew Tate" required value={profile.full_name} onChange={e => setProfile({ ...profile, full_name: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" readOnly value={profile.email} />
          </Form.Group>



          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Credit score" value={profile.credit_score} onChange={e => setProfile({ ...profile, credit_score: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Any previous rental history and references" value={profile.previous_rental_history_and_reference} onChange={e => setProfile({ ...profile, previous_rental_history_and_reference: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Length of lease desired" value={profile.desired_length_of_lease} onChange={e => setProfile({ ...profile, desired_length_of_lease: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="number" min={0} placeholder="Number of people to be living in the flat" value={profile.number_of_people_to_be_shared_with} onChange={e => setProfile({ ...profile, number_of_people_to_be_shared_with: parseInt(e.target.value) })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Any pets" value={profile.any_pets} onChange={e => setProfile({ ...profile, any_pets: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Smoking status" value={profile.smoking_status} onChange={e => setProfile({ ...profile, smoking_status: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Hobbies and interests" value={profile.hobbies_and_interests} onChange={e => setProfile({ ...profile, hobbies_and_interests: e.target.value })} />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Any other roommates or flat sharers" value={profile.hobbies_and_interests} onChange={e => setProfile({ ...profile, hobbies_and_interests: e.target.value })} />
                    </Form.Group> */}
        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Work schedules" value={profile.work_schedule} onChange={e => setProfile({ ...profile, work_schedule: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Cleaning habits" value={profile.cleaning_habits} onChange={e => setProfile({ ...profile, cleaning_habits: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Habits regarding sharing items or communal usage" value={profile.shared_items_and_communal_usage_habits} onChange={e => setProfile({ ...profile, shared_items_and_communal_usage_habits: e.target.value })} /> */}
        {/* </Form.Group> */}
        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Expectations for shared spaces" value={profile.preferred_quiet_hours} onChange={e => setProfile({ ...profile, preferred_quiet_hours: e.target.value })} />
                    </Form.Group> */}
        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Prefered quite hours" value={profile.preferred_quiet_hours} onChange={e => setProfile({ ...profile, preferred_quiet_hours: e.target.value })} />
          </Form.Group> */}
        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Preferred quiet hours" />
                </Form.Group> */}
        {/* Time range */}
        {/* <div>
                        <p>Preferred quiet hours :</p>
                        <div className='time_range'>
                            <input type="time" />
                            -
                            <input type="time" />
                        </div>
                    </div> */}
        {/* <button className="submit" id="my_button" onClick={handleEditProfile} disabled={inProcess}>
            {inProcess ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <span className='register_button'>Save & Close</span>}
          </button>

        </Form> */}
      </>
      }
    </>
  );
}

export default Profile;