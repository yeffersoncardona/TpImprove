import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { Title } from 'config';
import { useAuth } from 'hooks/useAuth';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import background from '/static/images/background.png';
import bg from '../static/images/bg.png';
import logo from '../static/images/logo-teleperformance.png';

export const Login = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [typeLogin, setTypeLogin] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme();
    const { ccmsLogin, mfaLogin, isExist } = useAuth();

    const checkUser = (e) => {
        e.preventDefault();

        setIsLoading(true);

        isExist(username)
            .then(({ data }) => {
                if (data) {
                    setActiveStep(1);
                    username.includes('@')
                        ? setTypeLogin('mfa')
                        : setTypeLogin('ccms');
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleCcmsLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            ccmsLogin(username, password).finally(() => setIsLoading(false));
        }, 1000);
    };

    const handleMfaLogin = () => {
        setIsLoading(true);

        setTimeout(() => {
            mfaLogin().finally(() => {
                setIsLoading(false);
            });
        }, 1000);
    };

    const backStep = () => {
        if (activeStep > 0) setActiveStep(0);
    };

    return (
        <div>
            <Head>
                <title> Sign In </title>
            </Head>
            <div className="login">
                <div className='d-flex flex-column'>
                <div className="login_container">
                    <h1 className="login_title m-0 pb-3"><span className='fw-bold'>TP</span>improve</h1>
                    <p className="login_text m-0">
                        You can log with your Teleperformance credentials
                    </p>
                    <div
                        style={{
                            maxWidth: '450px',
                        }}
                    >
                        <CardContent sx={{ height: 1 }}>
                            <Grid
                                container
                                sx={{ height: 1 }}
                                alignItems="center"
                            >
                                <Grid container spacing={3} item xs>
                                    {/* <Grid container justifyContent='center' item xs={12}>
											<Grid item xs='auto'>
												<Image src='/static/images/Icon.png' width='50px' height='50px' />
											</Grid>
											<Grid item xs='auto'>
												<Typography
													sx={{ ml: 3 }}
													variant="h3" >
													Sign In
												</Typography>
											</Grid>
										</Grid> */}

                                    <Grid item xs={12}>
                                        <Stepper activeStep={activeStep}>
                                            <Step>
                                                <StepLabel>
                                                    <p className='m-0'>Insert User</p>
                                                </StepLabel>
                                            </Step>

                                            <Step>
                                                <StepLabel>
                                                    <p className='m-0'>Authenticate</p>
                                                </StepLabel>
                                            </Step>
                                        </Stepper>
                                    </Grid>

                                    <Grid
                                        container
                                        justifyContent="center"
                                        item
                                        xs={12}
                                    >
                                        {isLoading ? (
                                            <Grid item xs="auto">
                                                <CircularProgress />
                                            </Grid>
                                        ) : (
                                            <>
                                                {activeStep === 0 && (
                                                    <form
                                                        onSubmit={checkUser}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <Grid
                                                            container
                                                            spacing={2}
                                                            justifyContent="center"
                                                            item
                                                            xs={12}
                                                        >
                                                            <Grid item xs={10}>
                                                                <TextField
                                                                    label="User Name"
                                                                    variant="standard"
                                                                    value={
                                                                        username
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setusername(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    fullWidth
                                                                    required
                                                                />
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xs={10}
                                                                justifyContent
                                                            >
                                                                <button
                                                                    className="btn_login"
                                                                    type="submit"
                                                                >
                                                                    Next
                                                                </button>
                                                            </Grid>
                                                        </Grid>
                                                    </form>
                                                )}

                                                {activeStep === 1 && (
                                                    <>
                                                        {typeLogin ===
                                                        'ccms' ? (
                                                            <form
                                                                onSubmit={
                                                                    handleCcmsLogin
                                                                }
                                                                style={{
                                                                    width: '100%',
                                                                }}
                                                            >
                                                                <Grid
                                                                    container
                                                                    spacing={2}
                                                                    justifyContent="center"
                                                                    item
                                                                    xs={12}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        xs={10}
                                                                    >
                                                                        <TextField
                                                                            label="Password"
                                                                            type="password"
                                                                            variant="standard"
                                                                            value={
                                                                                password
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setPassword(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            fullWidth
                                                                            required
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={10}
                                                                    >
                                                                        {/* <Button
																				variant="contained"
																				type="submit"
																				size="large"
																				color="primary"
																				// sx={{ bgcolor: 'primary.light' }}
																				fullWidth >
																				Sign In
																			</Button> */}
                                                                        <button
                                                                            className="btn_login"
                                                                            type="submit"
                                                                        >
                                                                            Log In
                                                                        </button>
                                                                    </Grid>
                                                                </Grid>
                                                            </form>
                                                        ) : (
                                                            <Grid
                                                                container
                                                                justifyContent="center"
                                                                item
                                                                xs={10}
                                                            >
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                >
                                                                    <Button
                                                                        onClick={
                                                                            handleMfaLogin
                                                                        }
                                                                        variant="contained"
                                                                        size="large"
                                                                        color="primary"
                                                                        // sx={{ bgcolor: 'primary.light' }}
                                                                        fullWidth
                                                                    >
                                                                        MfaLogin
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        )}
                                                    </>
                                                )}

                                                {activeStep !== 0 && (
                                                    <Grid item xs={10}>
                                                        <Button
                                                            sx={{ mt: 1 }}
                                                            onClick={backStep}
                                                            fullWidth
                                                        >
                                                            Back
                                                        </Button>
                                                    </Grid>
                                                )}
                                            </>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                            <img src="../static/images/logo-teleperformance.png" className="login_img" alt="login" />
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};
