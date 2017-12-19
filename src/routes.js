// 清酒稻香
import React from 'react'
import Tab from './containers/Tabs'
import { Switch, Route, Redirect } from 'react-router-dom'

export default (
  <Switch>
      <Route
        path="/tabs/:name"
        component={props => (<Tab {...props} />)} />
      <Route
        path="/search/:keyword"
        component={require('./containers/SearchEnd').default} />
      <Route
        path="/search"
        component={require('./containers/Searchpage').default} />
      <Route
        path="/person/applyRecord"
        component={require('./containers/DeliveryRecord').default} />
      <Route
        path="/person/privacy"
        component={require('./containers/PrivacyService').default} />
      <Route
        path="/person/more"
        component={require('./containers/MoreSeeting').default} />
      <Route
        path="/person/message"
        component={require('./containers/SystemMessage').default} />
      <Route
        path="/person/jobFavorites"
        component={require('./containers/SelectPost').default} />
      <Route
        path="/person/followedCompanies"
        component={require('./containers/SelectCompany').default} />
      <Route
        path="/person/letter/:message_id"
        component={require('./containers/BusinessLetter').default} />
      <Route
        path="/person/subscription"
        component={require('./containers/Subscription').default} />
      <Route
        path="/person/shield"
        component={require('./containers/AddCompany').default} />
      <Route
        path="/user/changePassword"
        component={require('./containers/ChangePassword').default} />
      <Route
        path="/user/bindPhone"
        component={require('./containers/BindMoblePhone').default} />
      <Route
        path="/user/bindEmail"
        component={require('./containers/BindEmail').default} />
      <Route
        path="/feedback"
        component={require('./containers/Opintion').default} />
      <Route
        path="/aboutous"
        component={require('./containers/AboutOus').default} />
      <Route
        path="/resume/info"
        component={require('./containers/ResumeInfo').default} />
      <Route
        path="/resume/intention"
        component={require('./containers/ResumeIntention').default} />
      <Route
        path="/resume/education/:id"
        component={require('./containers/ResumeEducationEdit').default} />
      <Route
        path="/resume/education"
        component={require('./containers/ResumeEducation').default} />
      <Route
        path="/resume/experience/:id"
        component={require('./containers/ResumeExperienceEdit').default} />
      <Route
        path="/resume/experience"
        component={require('./containers/ResumeExperience').default} />
      <Route
        path="/resume/language/:id"
        component={require('./containers/ResumeLanguageEdit').default} />
      <Route
        path="/resume/language"
        component={require('./containers/ResumeLanguage').default} />
      <Route
        path="/resume/skills/:id"
        component={require('./containers/ResumeSkillsEdit').default} />
      <Route
        path="/resume/skills"
        component={require('./containers/ResumeSkills').default} />
      <Route
        path="/resume/training/:id"
        component={require('./containers/ResumeTrainingEdit').default} />
      <Route
        path="/resume/training"
        component={require('./containers/ResumeTraining').default} />
      <Route
        path="/resume/certificate/:id"
        component={require('./containers/ResumeCertificateEdit').default} />
      <Route
        path="/resume/certificate"
        component={require('./containers/ResumeCertificate').default} />
      <Route
        path="/resume/other/:id"
        component={require('./containers/ResumeOtherEdit').default} />
      <Route
        path="/resume/other"
        component={require('./containers/ResumeOther').default} />
      <Route
        path="/resume/micro"
        component={require('./containers/MicroResume').default} />
      <Route
        path="/resume"
        component={require('./containers/Resume').default} />
      <Route
        path="/jobdetails"
        component={require('./containers/JobDetails_pan').default} />
      <Route
        path="/companyintroduce"
        component={require('./containers/CompanyIntroduce').default} />
      <Route
        path="/user/login"
        component={require('./containers/Login').default} />
      <Route
        path="/user/logincode"
        component={require('./containers/LoginCode').default} />
      <Route
        path="/user/register"
        component={require('./containers/Register').default} />
      <Route
        path="/user/forgetPassword"
        component={require('./containers/ForgetPassword').default} />
      <Route
        path="/chat/:id"
        component={require('./containers/Chat').default} />
      <Route
        path="/tip-offs"
        component={require('./containers/TipOffs').default} />
      <Route
        path="/:comapny_id/:job_id"
        component={require('./containers/PositionDetail').default} />
      <Route
        path="/:comapny_id"
        component={require('./containers/CompanyDetail').default} />

      <Redirect to="/tabs/home" />
    {/* <Route component={() => <h1>404</h1>} /> */}
  </Switch>
)