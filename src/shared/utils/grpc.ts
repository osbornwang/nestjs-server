import * as grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'
import * as grpc_promise from 'grpc-promise'

export class GrpcClient {
  private grpcStub

  constructor(
    protoPath: string,
    protoPackageName: string,
    protoServiceName: string,
    protoServerUrl: string,
  ) {
    const proto = this.loadProto(protoPath, protoPackageName)
    this.grpcStub = this.createStub(proto, protoServiceName, protoServerUrl)
  }

  private loadProto(proto_path: string, proto_package_name: string) {
    // load proto file dynamically
    const packageDefinition = protoLoader.loadSync(proto_path, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    })

    return grpc.loadPackageDefinition(packageDefinition)[proto_package_name]
  }

  private createStub(
    proto,
    proto_service_name: string,
    proto_server_url: string,
  ) {
    // create stub
    const stub = new (proto as any)[proto_service_name](
      proto_server_url,
      grpc.credentials.createInsecure(),
    )

    // promisify all methods of stub
    grpc_promise.promisifyAll(stub)

    return stub
  }

  getStub() {
    return this.grpcStub
  }
}
