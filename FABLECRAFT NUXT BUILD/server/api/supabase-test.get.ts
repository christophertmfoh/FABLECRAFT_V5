import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  try {
    // Try to get the Supabase instance info
    const { data, error } = await client.auth.getSession()

    if (error) {
      return {
        status: 'error',
        message: 'Failed to connect to Supabase',
        error: error.message,
        url: process.env.SUPABASE_URL,
      }
    }

    // Try a simple database query
    const { error: dbError } = await client.from('_test').select('*').limit(1)

    return {
      status: 'connected',
      message: 'Successfully connected to Supabase!',
      supabaseUrl: process.env.SUPABASE_URL,
      hasAuth: !!client.auth,
      hasDatabase: !dbError || dbError.message.includes('does not exist'),
      databaseMessage: dbError ? dbError.message : 'Database accessible',
    }
  } catch (err: unknown) {
    const e = err as Error
    return {
      status: 'error',
      message: 'Connection test failed',
      error: e?.message,
    }
  }
})
