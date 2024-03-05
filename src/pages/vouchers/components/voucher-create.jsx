import { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


import { Col, Row, Dropdown, Button, Modal, Form, Spinner } from "react-bootstrap";
import { createUser, generateUser, createUserProfile, getUsers, getUserProfile } from "../../../store/voucher/methods";

const CreateVoucher = () => {
    const [showVoucher, setShowVoucher] = useState(false);
    const [showGenVoucher, setShowGenVoucher] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [addMACCookie, setaddMACCookie] = useState(true);
    const { uuid } = useParams();


    const [voucher, setVoucher] = useState({
        server: '',
        name: '',
        password: '',
        voucher_profile: '',
        limit_uptime: '',
        limit_bytes_total: '',
        comment: '',


    })
    const [rvoucher, setRVoucher] = useState({
        vtype: '123456',
        vlength: '2',
        vcount: '1',
        _profile: 'defult',
        _uptime: '0m',
        _bytes_total: '0',
        _comment: '',


    })
    const [profile, setProfile] = useState({
        profile_name: '',
        shared_user: '',
        keepalive_timeoout: '',
        status_autorefresh: '',
        mac_cookie_timeout: '',
        rate_limit: '',
        on_login: `
            :global currentuser 
            :global sched [/system scheduler find name=$currentuser];
            :if ($sched) do={
            :global currentinterval [/system scheduler get $sched interval];
            :if ($currentinterval = [:totime "99w"]) do={
                :log  info ("user " . $currentuser . " first time login.");
                :global commentdata [/system scheduler get $sched comment];
                :global commandarr [:toarray $commentdata];
                :global timestr [:totime ($commandarr->0)];   
                :global validity [:totime ($commandarr->1)];   
                :global valfile ($commandarr->3);   
                :global isTimeLimit ($commandarr->2);   
                :global schedrun ($timestr + $validity);
                :if ($isTimeLimit = "1" ) do={
                /system scheduler set $sched interval=$schedrun;
                } else= {
                /system scheduler set $sched interval=$validity;
                }

                :global currvalidity [/system scheduler get $sched next-run];
                /file print file=$valfile;
                :delay 3000ms
                /file set $valfile contents=" ";
                /file set $valfile contents=$currvalidity;

            }
            }
        `,
        on_logout: `
            :global currentuser
            :global sched [/system scheduler find name=$currentuser];
            :global usr [/ip hotspot user find name=$currentuser];
            :if ($sched) do={
            :global usruptime [/ip hotspot user get $usr uptime];
            :global usrlimituptime [/ip hotspot user get $usr limit-uptime];
            :if ($usruptime >= $usrlimituptime) do={
                /system scheduler set $sched interval=1s;
            }
            }
        `,
    })

    const { vtype, vlength, vcount, _profile, _uptime, _bytes_total, _comment } = rvoucher
    const { server, name, password, voucher_profile, limit_uptime, limit_bytes_total, comment } = voucher
    const { profile_name, shared_user, keepalive_timeout, status_autorefresh,
        mac_cookie_timeout,
        rate_limit, on_login, on_logout } = profile



    const handleVoucherClose = () => setShowVoucher(false);
    const handleVoucherShow = () => setShowVoucher(true);

    const handleGenVoucherClose = () => setShowGenVoucher(false);
    const handleGenVoucherShow = () => setShowGenVoucher(true);

    const handleProfileClose = () => setShowProfile(false);
    const handleProfileShow = () => setShowProfile(true);


    const dispatch = useDispatch();

    const { user_profile, isLoading } = useSelector(
        (state) => state.voucher
    );

    const onChangeVoucher = async (e) => {
        setVoucher((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onChangeProfile = (e) => {
        setProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onChangeRVoucher = (e) => {
        setRVoucher((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const onProfileSubmit = (e) => {
        e.preventDefault();
        try {
            const payload = {
                uuid: uuid,
                data: {
                    profile_name: profile_name,
                    shared_users: shared_user,
                    keepalive_timeout: keepalive_timeout,
                    status_autorefresh: status_autorefresh,
                    add_mac_cookie: addMACCookie,
                    mac_cookie_timeout: mac_cookie_timeout,
                    rate_limit: rate_limit,
                    on_login: on_login,
                    on_logout: on_logout,
                }
            };

            dispatch(createUserProfile(payload));
            dispatch(getUserProfile(uuid));
            handleProfileClose()
        } catch (error) {
            console.log(error)
        }


    }
    const onVoucherSubmit = (e) => {
        e.preventDefault();
        try {
            const payload = {
                uuid: uuid,
                data: {
                    name: name,
                    password: password,
                    voucher_profile: voucher_profile,
                    limit_uptime: limit_uptime,
                    limit_bytes_total: limit_bytes_total,
                    comment: comment
                }
            };
            dispatch(createUser(payload));
            dispatch(getUsers(uuid));
            handleVoucherClose()
        } catch (error) {
            console.log(error)
        }

    }
    const onGenVoucherSubmit = (e) => {
        e.preventDefault();
        try {
            const payload = {
                uuid: uuid,
                data: {
                    vtype: vtype,
                    vlength: vlength,
                    vcount: vcount,
                    voucher_profile: _profile,
                    limit_uptime: _uptime,
                    limit_bytes_total: _bytes_total,
                    comment: _comment
                }
            };
            dispatch(generateUser(payload));
            dispatch(getUsers(uuid));
            handleGenVoucherClose()
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="btn-group me-2">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Add Voucher
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleProfileShow} >Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleVoucherShow} >Voucher</Dropdown.Item>
                    <Dropdown.Item onClick={handleGenVoucherShow} >Generate Voucher</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>

            <Modal show={showVoucher} onHide={handleVoucherClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Voucher</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onVoucherSubmit} >
                    <Modal.Body>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChangeVoucher}
                                id="name"
                                name="name"
                                value={name}
                                type="text"
                                placeholder="Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={onChangeVoucher}
                                id="password"
                                name="password"
                                value={password}
                                type="password"
                                placeholder="00000"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Profile</Form.Label>
                            <Form.Select onChange={onChangeVoucher}
                                id="voucher_profile"
                                name="voucher_profile"
                                value={voucher_profile}
                            >
                                {
                                    typeof user_profile === 'object' && user_profile !== null ?
                                        Object.keys(user_profile).map((profile, i) => (
                                            <option key={i}>{user_profile[profile]['name']}</option>
                                        )) : ''
                                }
                            </Form.Select>

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Limit Uptime</Form.Label>
                            <Form.Control
                                onChange={onChangeVoucher}
                                id="limit_uptime"
                                name="limit_uptime"
                                value={limit_uptime}
                                type="text"
                                placeholder="0w0d0h0m0s"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Limit Bytes total</Form.Label>
                            <Form.Control
                                onChange={onChangeVoucher}
                                id="limit_bytes_total"
                                name="limit_bytes_total"
                                value={limit_bytes_total}
                                type="text"
                                placeholder="0MB"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                onChange={onChangeVoucher}
                                id="comment"
                                name="comment"
                                value={comment}
                                type="text"
                                as="textarea"

                                placeholder=""
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleVoucherClose}>
                            Close
                        </Button>
                        <Button type="submit" disabled={isLoading} variant="primary">
                            {isLoading ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : (
                                "Save Voucher"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={showProfile} onHide={handleProfileClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Profile</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onProfileSubmit} >
                    <Modal.Body>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="profile_name"
                                name="profile_name"
                                value={profile_name}
                                type="text"
                                placeholder="Profile Name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Shared User</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="shared_user"
                                name="shared_user"
                                value={shared_user}
                                type="number"
                                placeholder="Shared User"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Keepalive Timeout</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="keepalive_timeout"
                                name="keepalive_timeout"
                                value={keepalive_timeout}
                                type="text"
                                placeholder="0m"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status  Auto-refresh</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="status_autorefresh"
                                name="status_autorefresh"
                                value={status_autorefresh}
                                type="text"
                                placeholder="0m"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check id="add_mac_cookie"
                                name="add"
                                onChange={() => {
                                    setaddMACCookie(!addMACCookie)
                                }}
                                type="checkbox" label="Add MAC Cookie" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>MAC Cookie Timeout</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                disabled={addMACCookie}
                                id="mac_cookie_timeout"
                                name="mac_cookie_timeout"
                                value={mac_cookie_timeout}
                                type="text"
                                placeholder="0w0d0h0m0s"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Rate Limit</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="rate_limit"
                                name="rate_limit"
                                value={rate_limit}
                                type="text"
                                placeholder="0M/0M"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>On Login</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="on_login"
                                name="on_login"
                                value={on_login}
                                type="text"
                                as="textarea"
                                placeholder=""
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>On Logout</Form.Label>
                            <Form.Control
                                onChange={onChangeProfile}
                                id="on_logout"
                                name="on_logout"
                                value={on_logout}
                                type="text"
                                as="textarea"
                                placeholder=""
                            />
                        </Form.Group>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleProfileClose}>
                            Close
                        </Button>
                        <Button type="submit" disabled={isLoading} variant="primary">
                            {isLoading ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : (
                                "Save Profile"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={showGenVoucher} onHide={handleGenVoucherClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Generate Voucher</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onGenVoucherSubmit} >
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Voucher Type</Form.Label>
                            <Form.Select onChange={onChangeRVoucher}
                                id="vtype"
                                name="vtype"
                                value={vtype}
                            >
                                <option>123456</option>
                                <option>abc123</option>
                                <option>ABC123</option>
                                <option>AbC123</option>
                                <option>abcdef</option>
                                <option>ABCDEF</option>
                                <option>AbCdEf</option>
                            </Form.Select>

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Code Length</Form.Label>
                            <Form.Control
                                onChange={onChangeRVoucher}
                                id="vlength"
                                name="vlength"
                                value={vlength}
                                type="text"
                                placeholder="Length"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Voucher Count</Form.Label>
                            <Form.Control
                                onChange={onChangeRVoucher}
                                id="vcount"
                                name="vcount"
                                value={vcount}
                                type="number"
                                placeholder="Count"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Profile</Form.Label>
                            <Form.Select onChange={onChangeRVoucher}
                                id="_profile"
                                name="_profile"
                                value={_profile}
                            >
                                {
                                    typeof user_profile === 'object' && user_profile !== null ?
                                        Object.keys(user_profile).map((profile, i) => (
                                            <option key={i}>{user_profile[profile]['name']}</option>
                                        )) : ''
                                }
                            </Form.Select>

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Limit Uptime</Form.Label>
                            <Form.Control
                                onChange={onChangeRVoucher}
                                id="limit_uptime"
                                name="_uptime"
                                value={_uptime}
                                type="text"
                                placeholder="0w0d0h0m0s"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Limit Bytes total</Form.Label>
                            <Form.Control
                                onChange={onChangeRVoucher}
                                id="_bytes_total"
                                name="_bytes_total"
                                value={_bytes_total}
                                type="text"
                                placeholder="0MB"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                onChange={onChangeRVoucher}
                                id="_comment"
                                name="_comment"
                                value={_comment}
                                type="text"
                                as="textarea"

                                placeholder=""
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleGenVoucherClose}>
                            Close
                        </Button>
                        <Button type="submit" disabled={isLoading} variant="primary">
                            {isLoading ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : (
                                "Save Voucher"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    );

}

export default CreateVoucher;