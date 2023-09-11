import td from 'testdouble'
import { GqlContext, testStudents } from '~generated/graphql/helpers/studentsQuerySpecWrapper'

test('students', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.studentRepository.findOne()).thenResolve()

  // const result = await testStudents( context);
})
