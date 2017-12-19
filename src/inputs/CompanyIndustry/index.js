import { connect } from 'react-redux'
import ComplexSelView from '../../components/Complex/ComplexSelView'

@connect(state => {
  return {
    options: state.option.opts_company_industry,
    optIndex: state.option.opts_company_industry_index,
  }
})
class CompanyIndustry extends ComplexSelView {}

export default CompanyIndustry
